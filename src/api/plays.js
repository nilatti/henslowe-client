import API from "./api_url";

async function createAct(playId, act) {
  return API.post(`plays/${playId}/acts`, {
    act,
  });
}

async function createCharacter(playId, character) {
  return API.post(`plays/${playId}/characters`, {
    character,
  });
}

async function createPlay(play) {
  return API.post("plays", {
    play,
  });
}

async function deletePlay(playId) {
  return API.delete(`plays/${playId}`);
}

async function getActs(playId) {
  return API.request(`plays/${playId}/acts`);
}

async function getActScript(actId) {
  return API.request(`acts/${actId}/act_script`, {
    params: {
      act: actId,
    },
  });
}

async function getCharacters(playId) {
  return API.request(`plays/${playId}/characters`);
}

async function getFrenchSceneScript(frenchSceneId) {
  return API.request(`french_scenes/${frenchSceneId}/french_scene_script`, {
    params: {
      french_scene: frenchSceneId,
    },
  });
}

async function getPlay(playId) {
  return API.request(`plays/${playId}`);
}

async function getPlayActOnStages(playId) {
  return API.request(`plays/${playId}/play_act_on_stages`, {
    params: {
      play: playId,
    },
  });
}

async function getPlayFrenchSceneOnStages(playId) {
  return API.request(`plays/${playId}/play_french_scene_on_stages`, {
    params: {
      play: playId,
    },
  });
}

async function getPlayOnStages(playId) {
  return API.request(`plays/${playId}/play_on_stages`, {
    params: {
      play: playId,
    },
  });
}
async function getPlaySceneOnStages(playId) {
  return API.request(`plays/${playId}/play_scene_on_stages`, {
    params: {
      play: playId,
    },
  });
}

async function getPlayScript(playId) {
  return API.request(`plays/${playId}/play_script`, {
    params: {
      play: playId,
    },
  });
}

async function getPlaySkeleton(playId) {
  return API.request(`plays/${playId}/play_skeleton`, {
    params: {
      play: playId,
    },
  });
}

async function getPlayTitles() {
  return API.request(`plays/play_titles`);
}

async function getPlays() {
  return API.request(`plays`);
}

async function getProductionCopyComplete(playId) {
  return API.request(`plays/${playId}/production_copy_complete`, {
    params: {
      play: playId,
    },
  });
}

async function getSceneScript(sceneId) {
  return API.request(`scenes/${sceneId}/scene_script`, {
    params: {
      scene: sceneId,
    },
  });
}

async function updateServerPlay(play) {
  return API.put(`plays/${play.id}`, {
    play: play,
  });
}

export {
  createAct,
  createCharacter,
  createPlay,
  deletePlay,
  getActs,
  getActScript,
  getCharacters,
  getFrenchSceneScript,
  getPlay,
  getPlayActOnStages,
  getPlayFrenchSceneOnStages,
  getPlayOnStages,
  getPlaySceneOnStages,
  getPlayScript,
  getPlaySkeleton,
  getPlayTitles,
  getPlays,
  getProductionCopyComplete,
  getSceneScript,
  updateServerPlay,
};
