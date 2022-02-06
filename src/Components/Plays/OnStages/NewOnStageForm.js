import { useEffect, useState } from "react";
import { Form, FormGroupInline } from "../../Form.js";
import { FormButtonGroup } from "../../Inputs.js";
import CharacterSelect from "../Characters/CharacterSelect.js";
import { useForm } from "../../../hooks/environmentUtils.js";
import { usePlayState } from "../../../lib/playState.js";
//filter characters, make a switch for character groups
export default function NewOnStageForm({ frenchScene, onFormClose }) {
  const { addNewOnStage, characters, characterGroups } = usePlayState();
  const [selectedCharacter, setSelectedCharacter] = useState();
  const [selectedCharacterGroup, setSelectedCharacterGroup] = useState();
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filteredCharacterGroups, setFilteredCharacterGroups] = useState([]);

  useEffect(() => {
    let onStageCharacterIds = frenchScene.on_stages.map(
      (os) => os.character_id
    );
    let tempCharacters = characters.filter(
      (c) => !onStageCharacterIds.includes(c.id)
    );
    setFilteredCharacters(tempCharacters);
    let onStageCharacterGroupIds = frenchScene.on_stages.map(
      (os) => os.character_group_id
    );
    let tempCharacterGroups = characterGroups.filter(
      (c) => !onStageCharacterGroupIds.includes(c.id)
    );
    setFilteredCharacterGroups(tempCharacterGroups);
  }, [JSON.stringify(frenchScene.on_stages)]);

  function handleCharacterSelect(e) {
    if (e?.length) {
      let character = e[0];
      setSelectedCharacter(character);
      inputs.character_id = character.id;
    }
  }

  function handleCharacterGroupSelect(e) {
    if (e?.length) {
      let character = e[0];
      setSelectedCharacterGroup(character);
      inputs.character_group_id = character.id;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNewOnStage(inputs);
    onFormClose();
    resetForm();
  }

  const { inputs, handleChange, resetForm } = useForm({
    character_id: "",
    character_group_id: "",
    description: "",
    french_scene_id: frenchScene.id,
    nonspeaking: false,
    type: "character",
  });
  return (
    <div>
      <h3>Add New OnStage</h3>
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="100%">
        <fieldset>
          <FormGroupInline>
            <label>Character or group?</label>
            <select name="type" onChange={handleChange} value={inputs.type}>
              <option
                key="character"
                checked={inputs.type === "character"}
                id="character"
                label="Character"
                name="character"
                type="radio"
                value="character"
              />
              <option
                key="character_group"
                checked={inputs.type === "character_group"}
                id="character_group"
                label="Character Group"
                name="character_group"
                type="radio"
                value="character_group"
              />
            </select>
          </FormGroupInline>
        </fieldset>
        {inputs.type === "character" ? (
          <fieldset>
            <CharacterSelect
              characters={filteredCharacters}
              onBlur={handleCharacterSelect}
              selectedCharacter={selectedCharacter}
            />
          </fieldset>
        ) : (
          <fieldset>
            <CharacterSelect
              characters={filteredCharacterGroups}
              onBlur={handleCharacterGroupSelect}
              selectedCharacter={selectedCharacterGroup}
            />
          </fieldset>
        )}
        <fieldset>
          <label>Description:</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="description"
            rows={10}
            type="text"
            value={inputs.description}
          />
        </fieldset>
        <fieldset>
          <FormGroupInline>
            <label>Type of role:</label>
            <select
              name="nonspeaking"
              onChange={handleChange}
              value={inputs.nonspeaking}
            >
              <option
                key="true"
                checked={inputs.nonspeaking === true}
                id="true"
                label="Speaking"
                name="nonspeaking"
                type="radio"
                value={true}
              />
              <option
                key="false"
                checked={inputs.nonspeaking === false}
                id="false"
                label="Nonspeaking"
                name="nonspeaking"
                type="radio"
                value={false}
              />
            </select>
          </FormGroupInline>
        </fieldset>
        <FormButtonGroup cancelFunction={onFormClose} />
      </Form>
    </div>
  );
}

//tk filter characters already on stage, separate characters from character groups
