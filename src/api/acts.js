import API from "./api_url";

async function createAct(playId, act) {
  return API.post(`plays/${playId}/acts`, {
    act,
  });
}

async function deleteAct(actId) {
  return API.delete(`acts/${actId}`);
}

async function getAct(actId) {
  return API.request(`acts/${actId}`);
}

async function getActs(playId) {
  return API.request(`plays/${playId}/acts`);
}

async function updateServerAct(act) {
  return API.put(`acts/${act.id}`, {
    act: act,
  });
}

export { createAct, deleteAct, getAct, getActs, updateServerAct };
