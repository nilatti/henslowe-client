import React, { useState } from "react";

import { Button } from "react-bootstrap";

import ConflictPatternCreator from "./ConflictPatternCreator.js";

export default function ConflictPatternCreatorToggle({ open, submitHandler }) {
  const [formOpen, setFormOpen] = useState(open);
  return (
    <>
      {formOpen ? (
        <ConflictPatternCreator
          cancel={setFormOpen}
          submitHandler={submitHandler}
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
