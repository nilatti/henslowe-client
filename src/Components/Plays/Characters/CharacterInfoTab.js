import _ from "lodash";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../Button";
import {
  TextAreaInputWithToggle,
  TextInput,
  TextInputWithToggle,
} from "../../Inputs";
import ToolTip from "../../ToolTip";
import info from "../../Images/info_icon.png";
import { usePlayState } from "../../../lib/playState";
import { useForm } from "../../../hooks/environmentUtils";
import { calculateLineCount } from "../../../utils/playScriptUtils";

import CharacterLine from "./CharacterLine";

const HeadingStyles = styled.div`
  display: flex;
  justify-content: center;
  h2 {
    padding: 0 5px;
  }
`;

const InfoDivStyles = styled.div`
  padding: 50px 25px;
`;

export default function CharacterInfoTab({ character }) {
  const { updateCharacter } = usePlayState();
  const [ageFormOpen, setAgeFormOpen] = useState(false);
  const [descriptionFormOpen, setDescriptionFormOpen] = useState(false);
  const [genderFormOpen, setGenderFormOpen] = useState(false);
  const [nameFormOpen, setNameFormOpen] = useState(false);
  const [showCut, setShowCut] = useState(true);

  const { inputs, handleChange } = useForm({
    age: character.age || "",
    description: character.description || "",
    gender: character.gender || "",
    id: character.id || null,
    name: character.name || character.xml_id || "",
    type: character.type || "character",
  });

  function closeAllForms() {
    setAgeFormOpen(false);
    setDescriptionFormOpen(false);
    setGenderFormOpen(false);
    setNameFormOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCharacter(inputs);
    closeAllForms();
  }
  function toggleAgeForm() {
    setAgeFormOpen(!ageFormOpen);
  }
  function toggleDescriptionForm() {
    setDescriptionFormOpen(!descriptionFormOpen);
  }
  function toggleGenderForm() {
    setGenderFormOpen(!genderFormOpen);
  }
  function toggleNameForm() {
    setNameFormOpen(!nameFormOpen);
  }

  function toggleShowCut() {
    setShowCut(!showCut);
  }
  let lines = character.lines;
  lines = _.filter(lines, function (o) {
    if (o.original_content.match(/\s+/)) {
      //get rid of anything that is just blank spaces
      return o;
    }
  });
  if (!showCut) {
    lines = _.filter(lines, function (o) {
      if (o.new_content && o.new_content.match(/\w/)) {
        //get rid of new ocntent that is blank spaces
        return o;
      } else if (!o.new_content) {
        return o; //or I guess if it doesn't have new content, return that?
      }
    });
  }
  lines = lines.map((line) => (
    <CharacterLine
      character={character}
      key={line.id}
      line={line}
      showCut={showCut}
    />
  ));

  return (
    <InfoDivStyles>
      <div>
        {nameFormOpen ? (
          <TextInput
            handleChange={handleChange}
            handleFormClose={toggleNameForm}
            handleSubmit={handleSubmit}
            label="Character Name"
            name="name"
            value={inputs.name}
          />
        ) : (
          <HeadingStyles>
            <h2>
              <span onDoubleClick={toggleNameForm}>{inputs.name}</span>
            </h2>
            <ToolTip icon={info}>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </HeadingStyles>
        )}
        <div>
          <TextInputWithToggle
            formOpen={genderFormOpen}
            handleChange={handleChange}
            handleFormClose={toggleGenderForm}
            handleSubmit={handleSubmit}
            label="Gender"
            name="gender"
            toggleForm={toggleGenderForm}
            toggleText="Doubleclick to add gender"
            value={inputs.gender}
          />
          <TextInputWithToggle
            formOpen={ageFormOpen}
            handleChange={handleChange}
            handleFormClose={toggleAgeForm}
            handleSubmit={handleSubmit}
            label="Age"
            name="age"
            toggleForm={toggleAgeForm}
            toggleText="Doubleclick to add age"
            value={inputs.age}
          />
        </div>
        <TextAreaInputWithToggle
          formOpen={descriptionFormOpen}
          handleChange={handleChange}
          handleFormClose={toggleDescriptionForm}
          handleSubmit={handleSubmit}
          label="Description"
          name="description"
          toggleForm={toggleDescriptionForm}
          toggleText="Doubleclick to add description"
          value={inputs.description}
        />

        {character.lines && (
          <p>Lines count: {calculateLineCount(character.lines)}</p>
        )}
        <div>
          <span
            className="right floated edit icon"
            // onClick={this.props.handleEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className="right floated trash icon"
            // onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
        <Button onClick={toggleShowCut}>
          {showCut ? <span>Hide </span> : <span>Show </span>}
          Cut Text
        </Button>
        {lines}
      </div>
    </InfoDivStyles>
  );
}
