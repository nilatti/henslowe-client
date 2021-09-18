import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { ACTOR_SPECIALIZATION_ID } from "../../utils/hardcodedConstants";
import { buildUserName } from "../../utils/actorUtils";
import { useProductionState } from "../../lib/productionState";

export default function NewCasting({ users }) {
  const { createCasting, production } = useProductionState();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCharacterName, setSelectedCharacterName] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  function handleChangeUser(e) {
    if (e.length > 0) {
      setSelectedUser([e[0]]);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let casting = {
      end_date: production.end_date,
      production_id: production.id,
      start_date: production.start_date,
      specialization_id: ACTOR_SPECIALIZATION_ID,
      theater_id: production.theater_id,
      user_id: selectedUser[0].id,
    };
    setFormOpen(false);
    createCasting(selectedCharacterName, casting);
  }

  let userOptions = users.map((user) => {
    return { id: user.id, name: buildUserName(user) };
  });
  if (!formOpen) {
    return <Button onClick={() => setFormOpen(true)}>Add New Casting</Button>;
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e)} width="100%">
      <FormGroupInline>
        <label>Actor</label>
        <Typeahead
          id="user"
          labelKey="name"
          required
          options={userOptions}
          onChange={(selected) => {
            handleChangeUser(selected);
          }}
          selected={selectedUser}
          placeholder="Choose the user"
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Character/Role</label>
        <Typeahead
          allowNew
          id="character"
          labelKey="name"
          required
          options={[]}
          onInputChange={(e) => setSelectedCharacterName(e)}
          onChange={(e) => {
            setSelectedCharacterName(e);
          }}
          selected={[]}
          placeholder="Choose character or role"
        />
      </FormGroupInline>
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={() => setFormOpen(false)} block>
        Cancel
      </Button>
    </Form>
  );
}
