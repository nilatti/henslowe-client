import _ from "lodash";

function buildUserName(user) {
  const userNameFirst = user.preferred_name || user.first_name || user.email;
  const userNameLast = user.last_name || user.email;
  return `${userNameFirst} ${userNameLast}`;
}

function sortUsers(usersArray) {
  return _.sortBy(usersArray, "last_name", "first_name", "email");
}

export { buildUserName, sortUsers };
