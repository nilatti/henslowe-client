import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import RehearsalPeopleForm from "./RehearsalPeopleForm";
import RehearsalPeopleShow from "./RehearsalPeopleShow";
import { useProductionState } from "../../../lib/productionState";

const People = styled.div`
  display: flex;
  flex: 1 1 0;
`;
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

  return (
    <People>
      {formOpen ? (
        <RehearsalPeopleForm
          calledUsers={rehearsal.users}
          rehearsal={rehearsal}
          handleEditClick={handleEditClick}
          onFormClose={toggleForm}
          onFormSubmit={handleSubmit}
        />
      ) : (
        <RehearsalPeopleShow
          handleEditClick={handleEditClick}
          calledUsers={rehearsal.users}
        />
      )}
    </People>
  );
}
EditableRehearsalPeople.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
