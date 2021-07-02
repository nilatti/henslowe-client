import { Link } from "react-router-dom";
import { useMeState } from "../../lib/meState";
import { Button } from "../Button";

import { buildUserName } from "../../utils/actorUtils";

export default function UsersList({ users }) {
  const { me } = useMeState();

  let usersList = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{buildUserName(user)}</Link>
    </li>
  ));

  return (
    <div>
      <ul>{usersList}</ul>
      {me.role === "superadmin" && (
        <Link to="/users/new">
          <Button>Add New</Button>
        </Link>
      )}
    </div>
  );
}
