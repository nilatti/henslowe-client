import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../Button";

import ConflictForm from "./ConflictForm.js";

export default function ConflictFormToggle({ isOpen, onFormSubmit }) {
  const [formOpen, setFormOpen] = useState(isOpen);
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleFormOpen() {
    setFormOpen(true);
  }

  if (formOpen) {
    return (
      <ConflictForm onFormClose={handleFormClose} onFormSubmit={onFormSubmit} />
    );
  } else {
    return (
      <Button variant="info" onClick={handleFormOpen}>
        Add New Conflict
      </Button>
    );
  }
}
