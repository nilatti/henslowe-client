import API from "./api.js";

async function createSpace(space) {
  return API.post("spaces", {
    space,
  });
}

async function deleteSpace(spaceId) {
  return API.delete(`spaces/${spaceId}`);
}

async function getSpace(spaceId) {
  return API.request(`spaces/${spaceId}`);
}

async function getSpaceNames() {
  return API.request(`spaces/space_names`);
}

async function getSpaces() {
  return API.request(`spaces`);
}

async function updateServerSpace(space) {
  return API.put(`spaces/${space.id}`, {
    space: space,
  });
}

export {
  createSpace,
  deleteSpace,
  getSpace,
  getSpaceNames,
  getSpaces,
  updateServerSpace,
};
