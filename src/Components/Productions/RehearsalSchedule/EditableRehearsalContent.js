import PropTypes from "prop-types";
import { useState } from "react";
import RehearsalContentForm from "./RehearsalContentForm";
import RehearsalContentShow from "./RehearsalContentShow";
import { useProductionState } from "../../../lib/productionState";

export default function EditableRehearsalContent({ rehearsal }) {
  const { updateRehearsal } = useProductionState();
  const [formOpen, setFormOpen] = useState(false);

  function handleEditClick() {
    setFormOpen(true);
  }
  function handleSubmit(rehearsal) {
    updateRehearsal(rehearsal);
    setFormOpen(false);
  }

  function toggleForm() {
    setFormOpen(!formOpen);
  }

  if (rehearsal === null) {
    return <div>Loading!</div>;
  }
  if (formOpen) {
    return (
      <RehearsalContentForm
        rehearsal={rehearsal}
        handleEditClick={handleEditClick}
        onFormClose={toggleForm}
        onFormSubmit={handleSubmit}
      />
    );
  }

  return (
    <RehearsalContentShow
      handleEditClick={handleEditClick}
      onFormSubmit={handleSubmit}
      acts={rehearsal.acts}
      frenchScenes={rehearsal.french_scenes}
      scenes={rehearsal.scenes}
    />
  );
}

EditableRehearsalContent.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
