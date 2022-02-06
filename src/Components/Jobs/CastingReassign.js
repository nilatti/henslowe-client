import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Button } from "../Button.js";
import { Form, FormGroupInline } from "../Form.js";
import { useProductionState } from "../../lib/productionState.js";
import { buildUserName } from "../../utils/actorUtils.js";
import { Spinner } from "../Loaders.js";
import Modal from "../Modal.js";
export default function CastingReassign({ onClose }) {
  const { actorsAndAuditioners, loading, reassignAllRolesForUser } =
    useProductionState();
  const [selectedNewUser, setSelectedNewUser] = useState([]);
  const [selectedOriginalUser, setSelectedOriginalUser] = useState([]);

  let userOptions = actorsAndAuditioners.map((user) => {
    return {
      id: user.id,
      name: `${buildUserName(user)}${user.fake ? " (fake)" : ""}`,
    };
  });

  function handleSubmit(e) {
    e.preventDefault();
    reassignAllRolesForUser(selectedNewUser[0].id, selectedOriginalUser[0].id);
    setSelectedNewUser([]);
    setSelectedOriginalUser([]);
  }

  if (loading) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }

  return (
    <Form
      backgroundColor="white"
      margin="5px"
      onSubmit={(e) => handleSubmit(e)}
      width="62%"
    >
      <FormGroupInline>
        <label>Reassign all roles from this actor: </label>
        <Typeahead
          id="original_user"
          labelKey="name"
          required
          options={userOptions}
          onChange={(selected) => {
            setSelectedOriginalUser(selected);
          }}
          selected={selectedOriginalUser}
          placeholder="Choose the original actor"
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>To this actor:</label>
        <Typeahead
          id="new_user"
          labelKey="name"
          required
          options={userOptions}
          onChange={(selected) => {
            setSelectedNewUser(selected);
          }}
          selected={selectedNewUser}
          placeholder="Choose the new actor"
        />
      </FormGroupInline>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
