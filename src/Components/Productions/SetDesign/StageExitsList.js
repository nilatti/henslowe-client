import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";

import { RIEInput } from "@attently/riek";
import { useProductionAuthState } from "../../Contexts";
import LoadingModal from "../../LoadingModal";

import {
  createItemWithParent,
  deleteItem,
  getItemsWithParent,
  updateServerItem,
} from "../../../api/crud";

import NewStageExitForm from "./NewStageExitForm";

export default function StageExitsList() {
  const { productionId } = useParams();
  const { role } = useProductionAuthState();
  const [loading, setLoading] = useState(false);
  const [newStageExitFormOpen, setNewStageExitFormOpen] = useState(false);
  const [stageExits, setStageExits] = useState([]);

  useEffect(async () => {
    setLoading(true);
    const response = await getItemsWithParent(
      "production",
      productionId,
      "stage_exit"
    );
    if (response.status >= 400) {
      console.log("error fetching stage exits");
    } else setStageExits(response.data);
    setLoading(false);
  }, []);

  async function createNewStageExit(stageExit) {
    const response = await createItemWithParent(
      "production",
      productionId,
      "stage_exit",
      stageExit
    );
    if (response.status >= 400) {
      console.log("error creating stage exit");
    } else {
      let tempStageExits = [...stageExits, response.data];
      setStageExits(tempStageExits);
      setNewStageExitFormOpen(false);
    }
  }

  async function deleteStageExit(stageExitId) {
    const response = await deleteItem(stageExitId, "stage_exit");
    if (response.status >= 400) {
      console.log("error deleting stage exit");
    } else {
      let tempStageExits = stageExits.filter(
        (stageExit) => stageExit.id !== stageExitId
      );
      setStageExits(tempStageExits);
    }
  }

  async function updateStageExit(nameObj, stageExitId) {
    let stageExitObj = {
      id: stageExitId,
      name: nameObj["name"],
    };
    const response = await updateServerItem(stageExitObj, "stage_exit");
    if (response.status >= 400) {
      console.log("error updating stage exit");
    } else {
      let tempStageExits = stageExits.map((stageExit) => {
        if (stageExit.id == stageExitId) {
          return { ...stageExit, name: nameObj["name"] };
        } else {
          return stageExit;
        }
      });
      setStageExits(tempStageExits);
    }
  }
  function toggleNewStageExitForm() {
    setNewStageExitFormOpen(!newStageExitFormOpen);
  }

  if (loading) return <LoadingModal />;
  let formattedStageExits = stageExits.map((stageExit) => (
    <li key={stageExit.id}>
      <RIEInput
        value={stageExit.name}
        change={(selected) => updateStageExit(selected, stageExit.id)}
        propName="name"
      />
      <span
        className="right floated trash icon"
        onClick={() => deleteStageExit(stageExit.id)}
      >
        <i className="fas fa-trash-alt"></i>
      </span>
    </li>
  ));

  return (
    <div>
      {role === "admin" && (
        <p>
          <em>Click to edit name</em>
        </p>
      )}

      <ul>{formattedStageExits}</ul>
      {newStageExitFormOpen ? (
        <NewStageExitForm
          onFormClose={toggleNewStageExitForm}
          onFormSubmit={createNewStageExit}
          productionId={parseInt(productionId)}
        />
      ) : (
        <Button onClick={toggleNewStageExitForm}>Add New</Button>
      )}
    </div>
  );
}
