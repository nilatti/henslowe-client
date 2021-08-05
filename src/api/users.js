import API from "./api_url";

async function buildUserConflictPattern(userId, conflictSchedulePattern) {
  return API.put(`users/${userId}/build_conflict_schedule`, {
    user: conflictSchedulePattern,
  });
}

async function createUser(user) {
  console.log("api call", user);
  return API.post("users", {
    user,
  });
}

async function deleteUser(userId) {
  return API.delete(`users/${userId}`);
}

async function loginUser(user) {
  return API.post("sign_in", {
    user: user,
  }).catch((err) => {
    return { status: 401, message: "Incorrect username or password" };
  });
}

async function getUser(userId) {
  return API.request(`users/${userId}`);
}

async function getUsers() {
  return API.request(`users`);
}

async function requestPasswordReset(email) {
  let user = { user: { email: email } };
  return API.post("password", user).catch((error) => {
    return error.response;
  });
}

async function resetPassword(token, password, passwordConfirmation) {
  return API.put("password", {
    user: {
      reset_password_token: token,
      password: password,
      password_confirmation: passwordConfirmation,
    },
  });
}

async function updateServerUser(user) {
  return API.put(`users/${user.id}`, {
    id: user.id,
    user: user,
  });
}

export {
  buildUserConflictPattern,
  createUser,
  deleteUser,
  loginUser,
  getUser,
  getUsers,
  requestPasswordReset,
  resetPassword,
  updateServerUser,
};
