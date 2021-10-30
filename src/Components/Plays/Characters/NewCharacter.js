import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../Button";
import { Form, FormGroupInline } from "../../Form";
import LoadingModal from "../../LoadingModal";
import { usePlayState } from "../../../lib/playState";
import { useForm } from "../../../hooks/environmentUtils";
import {
  CHARACTER_AGE_DESCRIPTORS,
  CHARACTER_GENDER_DESCRIPTORS,
} from "../../../utils/hardcodedConstants";
import { firstLetterUpcase } from "../../../utils/stringUtils";

const NewCharacterStyles = styled.div`
  padding: 25px;
  h3 {
    text-align: center;
    padding: 10px 0;
  }
`;
export default function NewCharacter({ setKey }) {
  const { addNewCharacter, play } = usePlayState();
  const { inputs, handleChange, resetForm } = useForm({
    age: "",
    description: "",
    gender: "",
    name: "",
    play_id: play.id,
    type: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let newCharacterId = await addNewCharacter(inputs);
    setLoading(false);
    setKey(`character-${newCharacterId}`);
  }

  function onFormClose() {
    resetForm();
  }
  if (loading) {
    <LoadingModal displayText="Creating character" />;
  }
  return (
    <NewCharacterStyles>
      <h3>Add New Character</h3>

      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="100%">
        <fieldset>
          <FormGroupInline>
            <label>Type:</label>
            <select
              name="type"
              onChange={handleChange}
              value={inputs.type}
              required
            >
              <option></option>
              <option
                key="character"
                checked={inputs.type === "character"}
                id="character"
                label="Character"
                name="type"
                type="radio"
                value="character"
              />
              <option
                key="character_group"
                checked={inputs.type === "character_group"}
                id="character_group"
                label="Character Group"
                name="type"
                type="radio"
                value="character_group"
              />
            </select>
          </FormGroupInline>
        </fieldset>
        <fieldset>
          <label>Name:</label>
          <input
            name="name"
            onChange={handleChange}
            placeholder="name"
            required
            type="text"
            value={inputs.name}
          />
        </fieldset>
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
        {inputs.type === "character" && (
          <>
            <fieldset>
              <FormGroupInline>
                <label>Age:</label>
                <select name="age" onChange={handleChange} value={inputs.age}>
                  <option></option>
                  {CHARACTER_AGE_DESCRIPTORS.map((age) => (
                    <option
                      key={age}
                      checked={inputs.age === age}
                      id={age}
                      label={firstLetterUpcase(age)}
                      name="age"
                      onChange={handleChange}
                      type="radio"
                      value={age}
                    />
                  ))}
                </select>
              </FormGroupInline>
            </fieldset>
            <fieldset>
              <FormGroupInline>
                <label>Gender:</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={inputs.gender}
                >
                  <option></option>
                  {CHARACTER_GENDER_DESCRIPTORS.map((gender) => (
                    <option
                      key={gender}
                      checked={inputs.gender === gender}
                      id={gender}
                      label={firstLetterUpcase(gender)}
                      name="gender"
                      onChange={handleChange}
                      type="radio"
                      value={gender}
                    />
                  ))}
                </select>
              </FormGroupInline>
            </fieldset>
          </>
        )}
        <Button type="submit" variant="primary" block>
          Submit
        </Button>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Form>
    </NewCharacterStyles>
  );
}
