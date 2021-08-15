import API from "./api";

async function createFrenchScene(sceneId, french_scene) {
  return API.post(`french_scenes`, {
    french_scene,
  });
}

async function deleteFrenchScene(frenchSceneId) {
  return API.delete(`french_scenes/${frenchSceneId}`);
}

async function getFrenchScene(frenchSceneId) {
  return API.request(`french_scenes/${frenchSceneId}`);
}

async function getFrenchScenes(frenchSceneId) {
  return API.request(`french_scenes/${frenchSceneId}/french_scenes`);
}

async function updateServerFrenchScene(frenchScene) {
  return API.put(`french_scenes/${frenchScene.id}`, {
    french_scene: frenchScene,
  });
}

export {
  createFrenchScene,
  deleteFrenchScene,
  getFrenchScene,
  getFrenchScenes,
  updateServerFrenchScene,
};
