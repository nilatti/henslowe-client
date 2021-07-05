import { useEffect, useState } from "react";
import { FormGroup } from "../../Form";

import { Typeahead } from "react-bootstrap-typeahead";

export default function CharacterSelect({
  characters,
  onBlur,
  selectedCharacter,
}) {
  const [selected, setSelected] = useState(selectedCharacter);
  if (!characters) {
    return <div>Loading characters!</div>;
  }
  return (
    <FormGroup>
      <label>Character</label>
      <Typeahead
        id="character"
        labelKey="name"
        onBlur={() => onBlur(selected)}
        onChange={setSelected}
        options={characters}
        placeholder="Choose a character..."
        selected={selected}
      />
    </FormGroup>
  );
}
