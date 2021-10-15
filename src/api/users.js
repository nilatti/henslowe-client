import API from "./api";

async function buildUserConflictPattern(userId, conflictSchedulePattern) {
  return API.put(`users/${userId}/build_conflict_schedule`, {
    user: conflictSchedulePattern,
  });
}

async function createUser(user) {
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

async function getFakeUsers() {
  return API.request(`users/fake`);
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
  getFakeUsers,
  updateServerUser,
};
