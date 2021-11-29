import _, { set } from "lodash";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ACTOR_SPECIALIZATION_ID,
  AUDITIONER_SPECIALIZATION_ID,
} from "../utils/hardcodedConstants";
import { buildRehearsalSchedule } from "../api/productions.js";

import {
  createItem,
  createItemWithParent,
  deleteItem,
  getItem,
  getItemsWithParent,
  updateServerItem,
} from "../api/crud";
import { getJobs } from "../api/jobs";
import { getFakeUsers } from "../api/users";
const ProductionStateContext = createContext();
const ProductionStateProvider = ProductionStateContext.Provider;

function ProductionProvider({ children }) {
  const { productionId } = useParams();
  const [actors, setActors] = useState([]);
  const [auditioners, setAuditioners] = useState([]);
  const [actorsAndAuditioners, setActorsAndAuditioners] = useState([]);
  const [castings, setCastings] = useState([]);
  const [fakeActorCount, setFakeActorCount] = useState({
    female: 0,
    male: 0,
    nonbinary: 0,
  });
  const [fakeActorsArray, setFakeActorsArray] = useState([]);
  const [fullPlay, setFullPlay] = useState();
  const [hiredUsers, setHiredUsers] = useState([]);
  const history = useHistory();
  const [jobs, setJobs] = useState([]);
  const [jobsActing, setJobsActing] = useState([]);
  const [jobsNotActing, setJobsNotActing] = useState([]);
  const [jobsAuditioned, setJobsAuditioned] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notActors, setNotActors] = useState([]);
  const [production, setProduction] = useState({});
  const [rehearsals, setRehearsals] = useState([]);

  useEffect(async () => {
    setLoading(true);
    if (productionId) {
      const response = await getItem(productionId, "production");
      if (response.status >= 400) {
        console.log("error getting production");
      } else {
        setProduction(response.data);
      }
    }
    setLoading(false);
  }, []);

  //set rehearsals
  useEffect(() => {
    let sortedRehearsals = _.sortBy(production.rehearsals, "start_time");
    let datedRehearsals = sortedRehearsals.map((rehearsal) => {
      return {
        ...rehearsal,
        date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
      };
    });
    setRehearsals(datedRehearsals);
  }, [JSON.stringify(production.rehearsals?.length)]);

  // set hired jobs
  useEffect(() => {
    if (production && production.jobs) {
      const hiredJobs = production.jobs.filter(
        (job) => job.specialization_id != AUDITIONER_SPECIALIZATION_ID
      );
      setJobs(hiredJobs);
      const auditionedJobs = production.jobs.filter(
        (job) => job.specialization_id == AUDITIONER_SPECIALIZATION_ID
      );
      setJobsAuditioned(auditionedJobs);

      let tempFakeActorsJobs = production.jobs.filter(
        (j) =>
          j.user &&
          j.user.fake &&
          (j.specialization_id == AUDITIONER_SPECIALIZATION_ID ||
            j.specialization_id == ACTOR_SPECIALIZATION_ID)
      );
      let tempFakeActors = _.compact(tempFakeActorsJobs.map((j) => j.user));
      let tempFakeActorsUniq = _.uniqBy(tempFakeActors, "id");
      let tempFakeActorsSorted = _.sortBy(tempFakeActorsUniq, [
        "gender",
        "last_name",
      ]);
      setFakeActorsArray(tempFakeActorsSorted);

      let tempFakeActorCount = { female: 0, male: 0, nonbinary: 0 };
      tempFakeActorsUniq.forEach((a) => {
        if (a.gender) {
          tempFakeActorCount[a.gender]++;
        } else {
          tempFakeActorCount["nonbinary"]++;
        }
      });
      setFakeActorCount(tempFakeActorCount);
    }
  }, [JSON.stringify(production.jobs)]);

  useEffect(() => {
    if (jobs) {
      setJobsActing(
        jobs.filter((job) => job.specialization_id == ACTOR_SPECIALIZATION_ID)
      );
      setJobsNotActing(
        jobs.filter((job) => job.specialization_id != ACTOR_SPECIALIZATION_ID)
      );
      const tempHiredJobs = jobs.filter(
        (job) =>
          job.user && job.specialization_id !== AUDITIONER_SPECIALIZATION_ID
      );
      const tempHiredJobUsers = tempHiredJobs.map((job) => job.user);
      let compactHiredUsers = _.compact(tempHiredJobUsers);
      let uniqueHiredUsers = _.uniqBy(compactHiredUsers, "id");
      let uniqueHiredUsersWithJobs = uniqueHiredUsers.map((user) => {
        let userJobs = jobs.filter((job) => {
          job.user_id === user.id;
        });
        return { ...user, jobs: userJobs };
      });
      let sortedHiredUsers = _.sortBy(uniqueHiredUsersWithJobs, [
        "last_name",
        "first_name",
        "email",
      ]);
      setHiredUsers(sortedHiredUsers);
    }
  }, [JSON.stringify(jobs)]);

  useEffect(() => {
    const auditionedJobUsers = jobsAuditioned.map((job) => job.user);
    let compactAuditioners = _.compact(auditionedJobUsers);
    let uniqueAuditioners = _.uniqBy(compactAuditioners, function (o) {
      return o.id;
    });
    setAuditioners(uniqueAuditioners);
  }, [JSON.stringify(jobsAuditioned)]);

  useEffect(() => {
    setCastings(
      jobsActing.filter(
        (job) =>
          job.specialization_id == ACTOR_SPECIALIZATION_ID &&
          job.character_id != null
      )
    );
    let compactActing = _.compact(jobsActing.map((job) => job.user));
    let uniqActing = _.uniqBy(compactActing, "id");
    setActors(uniqActing);
    let compactNotActing = _.compact(jobsNotActing.map((job) => job.user));
    let uniqNotActing = _.uniqBy(compactNotActing, "id");
    setNotActors(uniqNotActing);
  }, [JSON.stringify(jobsActing)]);

  useEffect(() => {
    let uniqActorsAndAuditioners = _.uniqBy(
      actors.concat(auditioners),
      function (o) {
        return o.id;
      }
    );
    let sortedActorsAndAuditioners = _.sortBy(uniqActorsAndAuditioners, [
      "fake",
      "gender",
      "last_name",
    ]);
    setActorsAndAuditioners(sortedActorsAndAuditioners);
  }, [JSON.stringify(actors), JSON.stringify(auditioners)]);

  function returnRandomFakeActors(
    actorPool,
    gender,
    currentNumber,
    desiredNumber
  ) {
    let numberToAdd = desiredNumber - currentNumber;
    let poolForGender = actorPool.filter((actor) => actor.gender == gender);
    let additionalFakeActors = [];
    do {
      //get random actor from pool for gender
      let newActor =
        poolForGender[Math.floor(Math.random() * poolForGender.length)];
      if (
        //make sure they aren't already in the pool
        additionalFakeActors.some((actor) => actor.id === newActor.id) ||
        //or already a fake actor on this production
        fakeActorsArray.some((actor) => actor.id === newActor.id)
      ) {
      } else {
        additionalFakeActors.push(newActor);
      }
      //stop when we get the number desired
    } while (additionalFakeActors.length < numberToAdd);
    return additionalFakeActors;
  }
  function updateProductionPlay(playData) {
    let tempProduction = { ...production };
    tempProduction.play = playData;
    setProduction(tempProduction);
  }
  async function createCharacter(characterName) {
    let character = {
      name: characterName,
      play_id: production.play.id,
    };
    const response = await createItemWithParent(
      "play",
      production.play.id,
      "character",
      character
    );
    if (response.status >= 400) {
      console.log("error creating character");
    } else {
      production.play.characters.push(response.data);
      return response.data;
    }
  }

  async function createCasting(characterName, casting) {
    let character = await createCharacter(characterName);
    let castingWithCharacter = { ...casting, character_id: character.id };
    const response = await createItemWithParent(
      "production",
      productionId,
      "job",
      castingWithCharacter
    );
    if (response.status >= 400) {
      console.log("error creating casting");
    } else {
      let tempCharacter = { id: character.id, name: characterName };
      let tempUser = actorsAndAuditioners.find(
        (actor) => actor.id == casting.user_id
      );
      let tempCasting = {
        id: response.data.id,
        production_id: production.id,
        specialization_id: ACTOR_SPECIALIZATION_ID,
        character_id: tempCharacter.id,
        character: tempCharacter,
        user_id: casting.user_id,
        user: tempUser,
      };
      let newCastings = castings.concat(tempCasting);
      setCastings(newCastings);
    }
  }

  async function createJob(job) {
    const response = await createItem(job, "job");
    if (response.status >= 400) {
      console.log("error creating job");
    } else {
      let tempProduction = { ...production };
      tempProduction.jobs = [...production.jobs, response.data];
      setProduction(tempProduction);
    }
  }

  async function createRehearsal(rehearsal) {
    const response = await createItemWithParent(
      "production",
      productionId,
      "rehearsal",
      rehearsal
    );
    if (response.status >= 400) {
      console.log("error creating rehearsal");
    } else {
      let newRehearsals = rehearsals.concat({
        ...response.data,
        date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
      });
      newRehearsals = _.sortBy(newRehearsals, "start_time");
      setRehearsals(newRehearsals);
    }
  }

  async function createRehearsalSchedulePattern(
    productionId,
    rehearsalSchedulePattern
  ) {
    let response = await buildRehearsalSchedule(
      productionId,
      rehearsalSchedulePattern
    );
    if (response.status >= 400) {
      console.log("error creating rehearsals");
    } else {
      setLoadingComplete(false);
      const allRehearsalResponse = await getItemsWithParent(
        "production",
        productionId,
        "rehearsal"
      );
      if (allRehearsalResponse) {
        setLoadingComplete(true);
      }
      if (allRehearsalResponse.status >= 400) {
        console.log("error getting rehearsals");
      } else {
        let sortedRehearsals = _.sortBy(
          allRehearsalResponse.data,
          "start_time"
        );
        let datedRehearsals = sortedRehearsals.map((rehearsal) => {
          return {
            ...rehearsal,
            date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
          };
        });

        setRehearsals(datedRehearsals);
        setLoadingComplete(true);
      }
    }
  }

  async function deleteProduction(productionId) {
    setLoading(true);
    const response = await deleteItem(productionId, "production");
    if (response.status >= 400) {
      console.log("error deleting production");
    } else {
      setProduction({});
      setActors([]);
      setAuditioners([]);
      setActorsAndAuditioners([]);
      setCastings([]);
      setFakeActorCount({ female: 0, male: 0, nonbinary: 0 });
      setFakeActorsArray([]);
      setFullPlay([]);
      setHiredUsers([]);
      setJobs([]);
      setJobsActing([]);
      setJobsNotActing([]);
      setJobsAuditioned([]);
      setLoading(false);
      setNotActors([]);
      setRehearsals([]);
      setLoading(false);
      history.push("/productions");
    }
    setLoading(false);
  }
  async function deleteRehearsal(rehearsalId) {
    const response = await deleteItem(rehearsalId, "rehearsal");
    if (response.status >= 400) {
      console.log("error deleting rehearsal");
    } else {
      setRehearsals(
        rehearsals.filter((rehearsal) => rehearsal.id !== rehearsalId)
      );
    }
  }

  async function deleteJob(jobId) {
    const response = await deleteItem(jobId, "job");
    if (response.status >= 400) {
      console.log("error deleting job");
    } else {
      let tempProduction = { ...production };
      tempProduction.jobs = production.jobs.filter((job) => job.id != jobId);
      setProduction(tempProduction);
    }
  }

  async function updateFakeActors(actorCount) {
    setLoading(true);
    let allFakeUsersResponse = await getFakeUsers();
    if (allFakeUsersResponse.status >= 400) {
      console.log("error getting fake users");
    } else {
      //need to add some NB actors
      let fakeAuditionersFemale = returnRandomFakeActors(
        allFakeUsersResponse.data,
        "female",
        fakeActorCount.female,
        actorCount.female
      );
      let fakeAuditionersMale = returnRandomFakeActors(
        allFakeUsersResponse.data,
        "male",
        fakeActorCount.female,
        actorCount.female
      );
      let fakeAuditioners = fakeAuditionersFemale.concat(fakeAuditionersMale);
      //create job for each
      fakeAuditioners.forEach((auditioner) => {
        createJob({
          production_id: production.id,
          specialization_id: AUDITIONER_SPECIALIZATION_ID,
          theater_id: production.theater_id,
          user_id: auditioner.id,
        });
      });
    }
    setLoading(false);
    //actorCount is an object: { female: int, male: int, nonbinary: int}
  }

  async function reassignAllRolesForUser(newUserId, oldUserId) {
    setLoading(true);
    let allJobs = jobsActing.filter((job) => job.user_id == oldUserId);
    allJobs.forEach((job) => {
      updateJob({ ...job, user_id: newUserId });
    });
    setLoading(false);
  }

  async function updateJob(updatedJob) {
    setLoading(true);
    const response = await updateServerItem(updatedJob, "job");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating job",
      });
    } else {
      const jobsResponse = await getJobs({ production_id: productionId });
      if (jobsResponse.status >= 400) {
        console.log("error fetching jobs");
      } else {
        let tempProduction = { ...production, jobs: jobsResponse.data };
        setProduction(tempProduction);
        setLoading(false);
      }
    }
  }

  async function updateProduction(production) {
    const response = await updateServerItem(production, "production");
    if (response.status >= 400) {
      console.log("Error updating production");
    } else {
      setProduction(response.data);
    }
  }

  async function updateRehearsal(updatedRehearsal) {
    const response = await updateServerItem(updatedRehearsal, "rehearsal");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating rehearsal",
      });
    } else {
      console.log(response.data);
      let newRehearsals = rehearsals.map((rehearsal) =>
        rehearsal.id === updatedRehearsal.id
          ? {
              ...response.data,
              date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
            }
          : rehearsal
      );
      setRehearsals(newRehearsals);
    }
  }

  return (
    <ProductionStateProvider
      value={{
        actors,
        actorsAndAuditioners,
        auditioners,
        castings,
        createCasting,
        createJob,
        createRehearsal,
        createRehearsalSchedulePattern,
        deleteJob,
        deleteProduction,
        deleteRehearsal,
        fakeActorCount,
        fakeActorsArray,
        fullPlay,
        jobs,
        jobsActing,
        jobsAuditioned,
        jobsNotActing,
        loading,
        hiredUsers,
        notActors,
        production,
        productionId,
        reassignAllRolesForUser,
        rehearsals,
        setCastings,
        setFullPlay,
        setHiredUsers,
        updateFakeActors,
        updateJob,
        updateProduction,
        updateProductionPlay,
        updateRehearsal,
      }}
    >
      {children}
    </ProductionStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useProductionState() {
  // We use a consumer here to access the local state
  const all = useContext(ProductionStateContext);
  return all;
}
export { ProductionProvider, useProductionState };
