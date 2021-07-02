import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import ConflictForm from "./ConflictForm";
import ConflictShow from "./ConflictShow";

const ConflictStyles = styled.li``;
export default function EditableConflict({
  conflict,
  handleDeleteClick,
  handleSubmit,
  role,
}) {
  const [formOpen, setFormOpen] = useState(false);
  function handleEditClick() {
    setFormOpen(!formOpen);
  }
  function handleEditSubmit(conflict) {
    handleSubmit(conflict);
    setFormOpen(false);
  }
  function toggleForm() {
    setFormOpen(!formOpen);
  }
  if (conflict === null) {
    return <div>Loading!</div>;
  }
  if (formOpen) {
    return (
      <ConflictStyles>
        <ConflictForm
          conflict={conflict}
          isOpen={true}
          onFormSubmit={handleEditSubmit}
          onFormClose={toggleForm}
        />
      </ConflictStyles>
    );
  } else {
    return (
      <ConflictStyles>
        <ConflictShow
          conflict={conflict}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          role={role}
        />
      </ConflictStyles>
    );
  }
}
