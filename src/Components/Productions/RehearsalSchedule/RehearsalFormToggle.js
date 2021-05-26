import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../../Button";

import RehearsalForm from "./RehearsalForm.js";
import { useProductionState } from "../../../lib/productionState";

export default function RehearsalFormToggle() {
  const [formOpen, setFormOpen] = useState(false);

  const { createRehearsal, productionId } = useProductionState();

  function handleFormOpen() {
    setFormOpen(true);
  }
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleFormSubmit(rehearsal) {
    handleFormClose();
    createRehearsal(rehearsal);
  }

  if (formOpen) {
    return (
      <RehearsalForm
        onFormClose={handleFormClose}
        onFormSubmit={handleFormSubmit}
        productionId={productionId}
      />
    );
  } else {
    return (
      <Button
        borderColor={"var(--color-very-dark)"}
        backgroundColor={"var(--color-very-dark)"}
        onClick={handleFormOpen}
      >
        Add New Rehearsal
      </Button>
    );
  }
}
RehearsalFormToggle.propTypes = {
  // isOpen: PropTypes.bool.isRequired,
  // onFormSubmit: PropTypes.func.isRequired,
  // production: PropTypes.object.isRequired,
};
