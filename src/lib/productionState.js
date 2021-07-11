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
  createItemWithParent,
  deleteItem,
  getItem,
  getItemsWithParent,
  updateServerItem,
} from "../api/crud";
import { getJobs } from "../api/jobs";

const ProductionStateContext = createContext();
const ProductionStateProvider = ProductionStateContext.Provider;
///tktktk add switch so that it only loads what it needs. eg. only loads all the rehearsals when it's mounted in that context, only loads whole play when mounted in doubling chart context etc.

function ProductionProvider({ children }) {
  const { productionId } = useParams();
  const [actors, setActors] = useState([]);
  const [auditioners, setAuditioners] = useState([]);
  const [actorsAndAuditioners, setActorsAndAuditioners] = useState([]);
  const [castings, setCastings] = useState([]);
  const [hiredUsers, setHiredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notActors, setNotActors] = useState([]);
  const [production, setProduction] = useState({});
  const [rehearsals, setRehearsals] = useState([]);

  //get production
  useEffect(async () => {
    setLoading(true);
    const response = await getItem(productionId, "production");
    if (response.status >= 400) {
      console.log("error getting jobs");
    } else {
      setProduction(response.data);
    }
    setLoading(false);
  }, []);
  //get users who are hired to work on this production
  useEffect(async () => {
    setLoading(true);
    const response = await getJobs({ production_id: productionId });
    if (response.status >= 400) {
      console.log("error getting jobs");
    } else {
      const hiredJobs = _.filter(response.data, function (o) {
        return o.specialization_id !== AUDITIONER_SPECIALIZATION_ID;
      });
      const hiredJobUsers = hiredJobs.map((job) => job.user);
      let compactHiredUsers = _.compact(hiredJobUsers);
      let uniqueHiredUsers = _.uniqBy(compactHiredUsers, function (o) {
        return o.id;
      });
      let uniqueHiredUsersWithJobs = uniqueHiredUsers.map((user) => {
        let userJobs = _.filter(hiredJobs, function (j) {
          return j.user_id === user.id;
        });
        return { ...user, jobs: userJobs };
      });
      setHiredUsers(uniqueHiredUsersWithJobs);
      const auditionedUsers = _.filter(response.data, function (o) {
        return o.specialization_id == AUDITIONER_SPECIALIZATION_ID;
      });
      const auditionedJobUsers = auditionedUsers.map((job) => job.user);
      let compactAuditioners = _.compact(auditionedJobUsers);
      let uniqueAuditioners = _.uniqBy(compactAuditioners, function (o) {
        return o.id;
      });
      setAuditioners(uniqueAuditioners);
      setCastings(
        _.filter(response.data, function (j) {
          return (j.specialization_id =
            ACTOR_SPECIALIZATION_ID && j.character_id != null);
        })
      );
    }
    setLoading(false);
  }, []); //maybe get it to run on production load?

  useEffect(async () => {
    setLoading(true);
    console.log("get play hook called");
    if (production.play?.id) {
      const response = await getItem(production.play?.id, "play");
      if (response.status >= 400) {
        console.log("error getting rehearsals");
      } else {
        let newProd = { ...production };
        newProd.play = response.data;
        setProduction(newProd);
        setLoading(false);
      }
    }
  }, [production.id]);

  //get rehearsals for production //maybe get it to run on production load?
  useEffect(async () => {
    const response = await getItemsWithParent(
      "production",
      productionId,
      "rehearsal"
    );
    if (response) {
      setLoading(false);
    }
    if (response.status >= 400) {
      console.log("error getting rehearsals");
    } else {
      let sortedRehearsals = _.sortBy(response.data, "start_time");
      let datedRehearsals = sortedRehearsals.map((rehearsal) => {
        return {
          ...rehearsal,
          date: moment(rehearsal.start_time).format("YYYY-MM-DD"),
        };
      });

      setRehearsals(datedRehearsals);
    }
  }, []);

  useEffect(() => {
    setActors(
      _.filter(hiredUsers, function (j) {
        let specializationIds = j.jobs.map((job) => job.specialization_id);
        if (specializationIds.length) {
          return specializationIds.includes(ACTOR_SPECIALIZATION_ID);
        }
      })
    );
    setNotActors(
      _.filter(hiredUsers, function (j) {
        let specializationIds = j.jobs.map((job) => job.specialization_id);
        if (specializationIds.length) {
          return !specializationIds.includes(ACTOR_SPECIALIZATION_ID);
        }
      })
    );
  }, [hiredUsers]);

  useEffect(() => {
    let uniqActorsAndAuditioners = _.uniqBy(
      actors.concat(auditioners),
      function (o) {
        return o.id;
      }
    );
    setActorsAndAuditioners(uniqActorsAndAuditioners);
  }, [actors, auditioners]);

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
    console.log(castingWithCharacter);
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
        createRehearsal,
        createRehearsalSchedulePattern,
        deleteRehearsal,
        loading,
        hiredUsers,
        notActors,
        production,
        productionId,
        rehearsals,
        setHiredUsers,
        setCastings,
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
