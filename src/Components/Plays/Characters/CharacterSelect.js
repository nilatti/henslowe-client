import { useEffect, useState } from "react";
import { FormGroup } from "../../Form";

import { Typeahead } from "react-bootstrap-typeahead";
import { usePlayState } from "../../../lib/playState";

export default function CharacterSelect({ onBlur, selectedCharacter }) {
  const { play } = usePlayState();
  const [selected, setSelected] = useState(selectedCharacter);
  if (!play.characters) {
    return <div>Loading characters!</div>;
  }
  let characterOptions = play.characters.map((character) => {
    return { id: character.id, name: character.name || "no name" };
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
