import _ from "lodash";
import { Link } from "react-router-dom";

function buildUserName(user) {
  const userNameFirst = user.preferred_name || user.first_name || user.email;
  const userNameLast = user.last_name || user.email;
  return `${userNameFirst} ${userNameLast}`;
}

function sortUsers(usersArray) {
  return _.sortBy(usersArray, "last_name", "first_name", "email");
}

function UserLink({ user }) {
  if (user.fake) {
    return (
      <em style={{ color: "var(--fake-actor)" }}>{buildUserName(user)}</em>
    );
  } else {
    return <Link to={`/users/${user.id}`}>{buildUserName(user)}</Link>;
  }
}

export { buildUserName, sortUsers, UserLink };
