import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";

import { RIEInput } from "@attently/riek";
import StageExitShow from "./StageExitShow.js";
import { useProductionAuthState } from "../../Contexts.js";
import LoadingModal from "../../LoadingModal.js";

import {
  createItemWithParent,
  deleteItem,
  getItemsWithParent,
  updateServerItem,
} from "../../../api/crud.js";

import StageExitForm from "./StageExitForm.js";

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

  async function updateStageExit(newStageExit) {
    const response = await updateServerItem(newStageExit, "stage_exit");
    if (response.status >= 400) {
      console.log("error updating stage exit");
    } else {
      let tempStageExits = stageExits.map((stageExit) => {
        if (stageExit.id == newStageExit.id) {
          return { ...newStageExit };
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
    <StageExitShow
      key={stageExit.id}
      onDelete={deleteStageExit}
      onFormSubmit={updateStageExit}
      stageExit={stageExit}
    />
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
        <StageExitForm
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
