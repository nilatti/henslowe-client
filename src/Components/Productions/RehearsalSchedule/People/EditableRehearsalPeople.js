import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styled from "styled-components";
import RehearsalPeopleForm from "./RehearsalPeopleForm";
import RehearsalPeopleShow from "./RehearsalPeopleShow";
import { useProductionState } from "../../../../lib/productionState";

const People = styled.div`
  display: flex;
  flex: 1 1 0;
`;
export default function EditableRehearsalPeople({ rehearsal }) {
  const { updateRehearsal } = useProductionState();
  const [formOpen, setFormOpen] = useState(false);
  const thisRehearsal = useRef(null);
  function closeForm() {
    setFormOpen(false);
    if (thisRehearsal.current) {
      window.scrollTo({
        behavior: "smooth",
        top: thisRehearsal.current.offsetTop,
      });
    }
  }

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
    <People ref={thisRehearsal}>
      {formOpen ? (
        <RehearsalPeopleForm
          calledUsers={rehearsal.users}
          rehearsal={rehearsal}
          handleEditClick={handleEditClick}
          onFormClose={closeForm}
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
