import _ from "lodash";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ACTOR_SPECIALIZATION_ID,
  AUDITION_SPECIALIZATION_ID,
} from "../utils/hardcodedConstants";
import { buildRehearsalSchedule } from "../api/productions.js";

const ProductionStateContext = createContext();
const ProductionStateProvider = ProductionStateContext.Provider;

import {
  createItemWithParent,
  deleteItem,
  getItem,
  getItemsWithParent,
  updateServerItem,
} from "../api/crud";
import { getJobs } from "../api/jobs";

function ProductionProvider({ children }) {
  const { id } = useParams();
  const [hiredUsers, setHiredUsers] = useState([]);
  const [actors, setActors] = useState([]);
  const [notActors, setNotActors] = useState([]);
  const [production, setProduction] = useState({});
  const [productionId, setProductionId] = useState(id);
  const [rehearsals, setRehearsals] = useState([]);
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  //get production
  useEffect(async () => {
    const response = await getItem(productionId, "production");
    if (response.status >= 400) {
      console.log("error getting jobs");
    } else {
      setProduction(response.data);
    }
  }, []);
  //get users who are hired to work on this production
  useEffect(async () => {
    const response = await getJobs({
      production_id: productionId,
    });
    if (response.status >= 400) {
      console.log("error getting jobs");
    } else {
      const hiredJobs = _.filter(response.data, function (o) {
        return o.specialization_id !== AUDITION_SPECIALIZATION_ID;
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
    }
  }, []);

  //get rehearsals for production
  useEffect(async () => {
    const response = await getItemsWithParent(
      "production",
      productionId,
      "rehearsal"
    );
    if (response) {
      setLoadingComplete(true);
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
        createRehearsal,
        createRehearsalSchedulePattern,
        deleteRehearsal,
        isLoadingComplete,
        hiredUsers,
        setHiredUsers,
        notActors,
        production,
        productionId,
        rehearsals,
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
