import _ from "lodash";
import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import RehearsalForm from "./RehearsalForm";
import RehearsalShow from "./RehearsalShow";

const RehearsalStyle = styled.div`
  border-top: 1px solid var(--color-light);
`;

export default function EditableRehearsal({ rehearsal }) {
  const [formOpen, setFormOpen] = useState(false);

  function toggleForm() {
    setFormOpen(!formOpen);
  }
  function handleEditClick() {
    toggleForm();
  }

  if (rehearsal === null) {
    return <div>Loading!</div>;
  }
  return (
    <RehearsalStyle>
      {formOpen ? (
        <RehearsalForm onFormClose={toggleForm} rehearsal={rehearsal} />
      ) : (
        <RehearsalShow
          rehearsal={rehearsal}
          handleEditClick={handleEditClick}
        />
      )}
    </RehearsalStyle>
  );
}
EditableRehearsal.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
