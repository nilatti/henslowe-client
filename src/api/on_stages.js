import API from "./api_url";
async function createOnStage(on_stage) {
  return API.post("on_stages", {
    on_stage,
  });
}

async function deleteOnStage(onStageId) {
  return API.delete(`on_stages/${onStageId}`);
}

async function getOnStages(frenchSceneId) {
  return API.request(`on_stages`, {
    params: {
      french_scene: frenchSceneId,
    },
  });
}

async function updateServerOnStage(onStage) {
  return API.put(`on_stages/${onStage.id}`, {
    on_stage: onStage,
  });
}

export { createOnStage, deleteOnStage, getOnStages, updateServerOnStage };
