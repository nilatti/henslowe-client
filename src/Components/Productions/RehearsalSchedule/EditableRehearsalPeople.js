import PropTypes from "prop-types";
import { useState } from "react";

import RehearsalPeopleForm from "./RehearsalPeopleForm";
import RehearsalPeopleShow from "./RehearsalPeopleShow";
import { useProductionState } from "../../../lib/productionState";

export default function EditableRehearsalPeople({ rehearsal }) {
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

  if (formOpen) {
    return (
      <RehearsalPeopleForm
        calledUsers={rehearsal.users}
        rehearsal={rehearsal}
        handleEditClick={handleEditClick}
        onFormClose={toggleForm}
        onFormSubmit={handleSubmit}
      />
    );
  }

  return (
    <RehearsalPeopleShow
      handleEditClick={handleEditClick}
      calledUsers={rehearsal.users}
    />
  );
}

EditableRehearsalPeople.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
