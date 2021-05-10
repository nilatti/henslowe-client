import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import RehearsalContentForm from "./RehearsalContentForm";
import RehearsalContentShow from "./RehearsalContentShow";
import { useProductionState } from "../../../lib/productionState";

const Content = styled.div`
  display: flex;
  flex: 1 1 0;
`;
export default function EditableRehearsalContent({ rehearsal }) {
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

  if (rehearsal === null) {
    return <div>Loading!</div>;
  }
  return (
    <Content>
      {formOpen ? (
        <RehearsalContentForm
          rehearsal={rehearsal}
          handleEditClick={handleEditClick}
          onFormClose={toggleForm}
          onFormSubmit={handleSubmit}
        />
      ) : (
        <RehearsalContentShow
          handleEditClick={handleEditClick}
          onFormSubmit={handleSubmit}
          acts={rehearsal.acts}
          frenchScenes={rehearsal.french_scenes}
          scenes={rehearsal.scenes}
        />
      )}
    </Content>
  );
}

EditableRehearsalContent.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
