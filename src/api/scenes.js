import API from "./api_url";

async function createScene(actId, scene) {
  return API.post(`scenes`, {
    scene,
  });
}

async function deleteScene(sceneId) {
  return API.delete(`scenes/${sceneId}`);
}

async function getScene(sceneId) {
  return API.request(`scenes/${sceneId}`);
}

async function getScenes(actId) {
  return API.request(`acts/${actId}/scenes`);
}

async function updateServerScene(scene) {
  return API.put(`scenes/${scene.id}`, {
    scene: scene,
  });
}

export { createScene, deleteScene, getScene, getScenes, updateServerScene };
