import API from "./api";

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

async function renderCutScript(actId, playId) {
  console.log("render called", actId);
  return API.request(`acts/${actId}/render_cut_script`, {
    responseType: "blob",
    params: {
      play_id: playId,
    },
  });
}

async function renderMarkedScript(actId, playId) {
  return API.request(`acts/${actId}/render_cuts_marked_script`, {
    responseType: "blob",
    params: {
      play_id: playId,
    },
  });
}

export {
  createAct,
  deleteAct,
  getAct,
  getActs,
  renderCutScript,
  renderMarkedScript,
  updateServerAct,
};
