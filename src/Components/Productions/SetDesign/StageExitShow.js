import { useState } from "react";
import StageExitForm from "./StageExitForm";

export default function StageExitShow({ onDelete, onFormSubmit, stageExit }) {
  const [formOpen, setFormOpen] = useState(false);

  function toggleFormOpen() {
    setFormOpen(!formOpen);
  }
  return (
    <li>
      {formOpen ? (
        <StageExitForm
          onFormClose={toggleFormOpen}
          onFormSubmit={onFormSubmit}
          productionId={stageExit.production_id}
          stageExit={stageExit}
        />
      ) : (
        <span onClick={() => toggleFormOpen()}>{stageExit.name}</span>
      )}

      <span
        className="right floated trash icon"
        onClick={() => onDelete(stageExit.id)}
      >
        <i className="fas fa-trash-alt"></i>
      </span>
    </li>
  );
}
