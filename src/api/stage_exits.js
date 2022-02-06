import API from "./api.js";

async function createStageExit(productionId, stage_exit) {
  return API.post(`productions/${productionId}/stage_exits`, {
    stage_exit,
  });
}

async function deleteStageExit(stageExitId) {
  return API.delete(`stage_exits/${stageExitId}`);
}

async function getStageExits(productionId) {
  return API.request(`productions/${productionId}/stage_exits`);
}

async function updateServerStageExit(stageExit) {
  return API.put(`stage_exits/${stageExit.id}`, {
    stage_exit: stageExit,
  });
}

export {
  createStageExit,
  deleteStageExit,
  getStageExits,
  updateServerStageExit,
};
