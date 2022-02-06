import React, { useState } from "react";

import { Button } from "../../Button.js";

import RehearsalPatternCreator from "./RehearsalPatternCreator.js";

export default function RehearsalPatternCreatorToggle({ isOpen, production }) {
  const [formOpen, setFormOpen] = useState(isOpen);
  return (
    <>
      {formOpen ? (
        <RehearsalPatternCreator production={production} cancel={setFormOpen} />
      ) : (
        <Button
          backgroundColor={"var(--color-light)"}
          borderColor={"var(--color-light)"}
          colorProp={"var(--color-very-dark)"}
          onClick={() => {
            setFormOpen(true);
          }}
        >
          Add Rehearsal Schedule Pattern
        </Button>
      )}
    </>
  );
}
