import _ from "lodash";
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

const ProductionStateContext = createContext();
const ProductionStateProvider = ProductionStateContext.Provider;

function ProductionProvider({ children }) {
  const { productionId } = useParams();
  const [actors, setActors] = useState([]);
  const [auditioners, setAuditioners] = useState([]);
  const [actorsAndAuditioners, setActorsAndAuditioners] = useState([]);
  const [castings, setCastings] = useState([]);
  const [hiredUsers, setHiredUsers] = useState([]);
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
  }, [JSON.stringify(production.rehearsals)]);

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
      const hiredJobUsers = jobs.map(
        (job) =>
          job.user && job.specialization_id != AUDITIONER_SPECIALIZATION_ID
      );
      let compactHiredUsers = _.compact(hiredJobUsers);
      let uniqueHiredUsers = _.uniqBy(compactHiredUsers, function (o) {
        o.id;
      });
      let uniqueHiredUsersWithJobs = uniqueHiredUsers.map((user) => {
        let userJobs = jobs.filter((job) => {
          job.user_id === user.id;
        });
        return { ...user, jobs: userJobs };
      });
      setHiredUsers(uniqueHiredUsersWithJobs);
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
    setActors(_.compact(jobsActing.map((job) => job.user)));
    setNotActors(_.compact(jobsNotActing.map((job) => job.user)));
  }, [JSON.stringify(jobsActing)]);

  useEffect(() => {
    let uniqActorsAndAuditioners = _.uniqBy(
      actors.concat(auditioners),
      function (o) {
        return o.id;
      }
    );
    setActorsAndAuditioners(uniqActorsAndAuditioners);
  }, [JSON.stringify(actors), JSON.stringify(auditioners)]);

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

  async function updateJob(updatedJob) {
    const response = await updateServerItem(updatedJob, "job");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating job",
      });
    } else {
      let newJobs = jobs.map((job) => {
        if (job.id === updatedJob.id) {
          return response.data;
        } else {
          return job;
        }
      });
      setJobs(newJobs);
    }
  }

  async function updateRehearsal(updatedRehearsal) {
    delete updatedRehearsal.acts;
    delete updatedRehearsal.french_scenes;
    delete updatedRehearsal.scenes;
    delete updatedRehearsal.spaces;
    delete updatedRehearsal.users;
    const response = await updateServerItem(updatedRehearsal, "rehearsal");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating rehearsal",
      });
    } else {
      let newRehearsals = rehearsals.map((rehearsal) => {
        if (rehearsal.id === updatedRehearsal.id) {
          return {
            ...response.data,
            date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
          };
        } else {
          return rehearsal;
        }
      });
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
        deleteRehearsal,
        jobs,
        jobsActing,
        jobsAuditioned,
        jobsNotActing,
        loading,
        hiredUsers,
        notActors,
        production,
        productionId,
        rehearsals,
        setHiredUsers,
        setCastings,
        updateJob,
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
