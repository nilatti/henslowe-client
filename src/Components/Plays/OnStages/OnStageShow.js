import styled from "styled-components";
import { useState } from "react";
import { TextAreaInputWithToggle } from "../../Inputs";
import { usePlayState } from "../../../lib/playState";
import { useForm } from "../../../hooks/environmentUtils";

const OnStageShowStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 10px;
  div {
    flex: 1;
  }
`;
export default function OnStageShow({ onStage }) {
  const { deleteOnStage, updateOnStage } = usePlayState();
  const [descriptionEditOpen, setDescriptionEditOpen] = useState(false);
  const [nonspeaking, setNonspeaking] = useState(onStage.nonspeaking);

  const { inputs, handleChange } = useForm({
    description: onStage.description || "",
    id: onStage.id || null,
  });

  function handleDelete() {
    deleteOnStage(onStage);
  }

  function handleNonspeakingClick(bool) {
    console.log('nonspeaking handler', bool)
    let workingOnStage = { ...onStage, nonspeaking: bool };
    updateOnStage(workingOnStage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateOnStage(inputs);
    setDescriptionEditOpen(false);
  }

  function toggleDescriptionEditOpen() {
    setDescriptionEditOpen(!descriptionEditOpen);
  }

  let characterName;
  if (onStage.character) {
    characterName = onStage.character.name;
  } else if (onStage.character_group) {
    characterName = onStage.character_group.name;
  } else {
    characterName = "";
  }
  return (
    <OnStageShowStyles>
      <div>{characterName}</div>

      <TextAreaInputWithToggle
        formOpen={descriptionEditOpen}
        handleChange={handleChange}
        handleFormClose={toggleDescriptionEditOpen}
        handleSubmit={handleSubmit}
        label="Description"
        name="description"
        toggleForm={toggleDescriptionEditOpen}
        toggleText="Click to add description"
        value={inputs.description}
      />
      <div>
        {nonspeaking ? (
          <span onDoubleClick={() => handleNonspeakingClick(false)}>
            {" "}
            Speaking
          </span>
        ) : (
          <span onDoubleClick={() => handleNonspeakingClick(true)}>
            {" "}
            Nonspeaking
          </span>
        )}
      </div>
      <div className="right floated trash icon" onClick={handleDelete}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </OnStageShowStyles>
  );
}
