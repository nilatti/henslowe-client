import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroupInline } from "../Form";

export default function CastingForm({
  availableActors,
  casting,
  handleChangeUser,
  selectedUser,
  toggleForm,
}) {
  console.log(availableActors);
  return (
    <Form width="100%">
      <FormGroupInline justifyContent="flex-start">
        <label>{casting.character.name}</label>
        <Typeahead
          id="user"
          labelKey="name"
          options={availableActors}
          onBlur={() => {
            toggleForm();
          }}
          onChange={(selected) => {
            handleChangeUser(selected);
          }}
          selected={selectedUser}
          placeholder="Choose actor"
        />
      </FormGroupInline>
    </Form>
  );
}
