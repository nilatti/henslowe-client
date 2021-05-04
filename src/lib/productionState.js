import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [production, setProduction] = useState({});
  const [productionId, setProductionId] = useState(id);
  const [rehearsals, setRehearsals] = useState([]);

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
        return o.specialization_id !== 4;
      });
      const hiredJobUsers = hiredJobs.map((job) => job.user);
      let compactHiredUsers = _.compact(hiredJobUsers);
      let uniqueHiredUsers = _.uniqBy(compactHiredUsers, function (o) {
        return o.id;
      });
      setHiredUsers(uniqueHiredUsers);
    }
  }, []);

  //get rehearsals for production
  useEffect(async () => {
    const response = await getItemsWithParent(
      "production",
      productionId,
      "rehearsal"
    );
    if (response.status >= 400) {
      console.log("error getting rehearsals");
    } else {
      setRehearsals(response.data);
    }
  }, []);

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
    const response = await updateServerItem(updatedRehearsal, "rehearsal");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating rehearsal",
      });
    } else {
      let newRehearsals = rehearsals.map((rehearsal) => {
        if (rehearsal.id === updatedRehearsal.id) {
          return response.data;
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
        deleteRehearsal,
        hiredUsers,
        setHiredUsers,
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
