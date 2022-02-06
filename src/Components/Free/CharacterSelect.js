import { useEffect, useState } from "react";
import { FormGroup } from "../Form.js";

import { Typeahead } from "react-bootstrap-typeahead";
import { usePlayState } from "../../lib/freePlayState.js";

export default function CharacterSelect({
  characters,
  onBlur,
  selectedCharacter,
}) {
  const { charactersAll } = usePlayState();
  let availableCharacters = characters || charactersAll;
  const [selected, setSelected] = useState(selectedCharacter);
  if (!availableCharacters) {
    return <div>Loading characters!</div>;
  }
  let characterOptions = availableCharacters.map((character) => {
    return {
      id: character.id,
      name: character.name || character.xml_id || "no name",
    };
  });

  return (
    <FormGroup>
      <label>Character</label>
      <Typeahead
        id="character"
        labelKey="name"
        onBlur={() => onBlur(selected)}
        onChange={setSelected}
        options={characterOptions}
        placeholder="Choose a character..."
        selected={selected || []}
      />
    </FormGroup>
  );
}
