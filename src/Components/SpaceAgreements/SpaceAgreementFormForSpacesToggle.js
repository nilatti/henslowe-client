import PropTypes from "prop-types";
import { Button } from "../Button";
import { useState } from "react";

import SpaceAgreementFormForSpaces from "./SpaceAgreementFormForSpaces.js";

export default function SpaceAgreementFormForSpacesToggle({
  onFormSubmit,
  space,
}) {
  const [formOpen, setFormOpen] = useState(false);
  function handleFormClose() {
    setFormOpen(false);
  }
  function handleFormOpen() {
    setFormOpen(true);
  }

  function handleFormSubmit(spaceAgreements) {
    handleFormClose();
    onFormSubmit(spaceAgreements);
  }

  if (formOpen) {
    return (
      <SpaceAgreementFormForSpaces
        onFormSubmit={handleFormSubmit}
        onFormClose={handleFormClose}
        space={space}
      />
    );
  }
  return (
    <div>
      <Button variant="info" onClick={handleFormOpen}>
        Add/Remove Theaters
      </Button>
    </div>
  );
}
