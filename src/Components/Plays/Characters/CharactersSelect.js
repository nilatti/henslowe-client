import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup } from "../../Form";

export default function CharacterSelect({
  characters,
  handleChangeCharacter,
  selectedCharacters,
}) {
  return (
    <FormGroup>
      <label>Characters</label>
      <Typeahead
        id="characters"
        multiple
        required
        options={characters}
        onChange={(selected) => {
          handleChangeCharacter(selected);
        }}
        selected={selectedCharacters}
        placeholder="Choose the characters"
      />
    </FormGroup>
  );
}
