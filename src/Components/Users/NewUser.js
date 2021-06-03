import PropTypes from "prop-types";

import UserForm from "./UserForm";
import { useQuery } from "../../hooks/environmentUtils";

export default function NewUser({ onFormClose, onFormSubmit }) {
  let query = useQuery();
  let email = query.get("email");
  let first_name = query.get("first_name");
  let last_name = query.get("last_name");
  let registerNewUser = query.get("register_new");
  return (
    <>
      <h1>Add New User</h1>
      <UserForm
        user={{ email, first_name, last_name }}
        onFormSubmit={onFormSubmit}
        onFormClose={onFormClose}
        registerNew={registerNewUser}
      />
    </>
  );
}

NewUser.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
};
