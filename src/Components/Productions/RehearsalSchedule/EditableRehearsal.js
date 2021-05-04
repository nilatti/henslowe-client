import _ from "lodash";
import PropTypes from "prop-types";
import { useState } from "react";
import RehearsalForm from "./RehearsalForm";
import RehearsalShow from "./RehearsalShow";
import { useProductionState } from "../../../lib/productionState";

export default function EditableRehearsal({ rehearsal }) {
  const [formOpen, setFormOpen] = useState(false);

  function toggleForm() {
    setFormOpen(!formOpen);
  }
  function handleEditClick() {
    toggleForm();
  }

  if (rehearsal === null) {
    return <div>Loading!</div>;
  }
  if (formOpen) {
    return <RehearsalForm onFormClose={toggleForm} rehearsal={rehearsal} />;
  } else {
    return (
      <RehearsalShow rehearsal={rehearsal} handleEditClick={handleEditClick} />
    );
  }
}
EditableRehearsal.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
