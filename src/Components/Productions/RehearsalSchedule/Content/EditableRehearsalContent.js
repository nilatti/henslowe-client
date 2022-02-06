import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styled from "styled-components";
import RehearsalContentForm from "./RehearsalContentForm.js";
import RehearsalContentShow from "./RehearsalContentShow.js";
import { useProductionState } from "../../../../lib/productionState.js";

const Content = styled.div`
  display: flex;
  flex: 1 1 0;
`;

export default function EditableRehearsalContent({ rehearsal }) {
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
  function handleSubmit(rehearsal, formOpen = true) {
    updateRehearsal(rehearsal);
    if (!formOpen) {
      closeForm();
    }
  }

  if (rehearsal === null) {
    return <div>Loading!</div>;
  }
  return (
    <Content ref={thisRehearsal}>
      {formOpen ? (
        <RehearsalContentForm
          rehearsal={rehearsal}
          handleEditClick={handleEditClick}
          onFormClose={closeForm}
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
