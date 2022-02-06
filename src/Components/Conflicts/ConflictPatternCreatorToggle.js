import React, { useState } from "react";

import { Button } from "../Button.js";

import ConflictPatternCreator from "./ConflictPatternCreator.js";

export default function ConflictPatternCreatorToggle({ open, onFormSubmit }) {
  const [formOpen, setFormOpen] = useState(open);
  return (
    <>
      {formOpen ? (
        <ConflictPatternCreator
          cancel={setFormOpen}
          onFormSubmit={onFormSubmit}
        />
      ) : (
        <Button
          onClick={() => {
            setFormOpen(true);
          }}
        >
          Add Conflict Schedule Pattern
        </Button>
      )}
    </>
  );
}
