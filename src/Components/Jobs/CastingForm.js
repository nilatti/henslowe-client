import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, FormGroupInline } from "../Form.js";
import { buildUserName } from "../../utils/actorUtils.js";

export default function CastingForm({
  availableActors,
  casting,
  handleChangeUser,
  selectedUser,
  toggleForm,
}) {
  const [actorObjects, setActorObjects] = useState([]);
  useEffect(() => {
    let labeledActors = availableActors.map((actor) => {
      return { ...actor, name: buildUserName(actor) };
    });
    setActorObjects(labeledActors);
  }, []);
  return (
    <Form width="100%">
      <FormGroupInline justifyContent="flex-start">
        <label>{casting.character.name}</label>
        <Typeahead
          id="user"
          labelKey="name"
          options={actorObjects}
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
