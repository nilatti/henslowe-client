import React, { useState } from "react";

import { Button } from "../../Button";

import RehearsalPatternCreator from "./RehearsalPatternCreator";

export default function RehearsalPatternCreatorToggle({ open, production }) {
  const [formOpen, setFormOpen] = useState(open);
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
