import API from './api'

async function createEntranceExit(frenchSceneId, entrance_exit) {
  return API.post(
    `french_scenes/${frenchSceneId}/entrance_exits`, {
      entrance_exit
    }
  )
}

async function deleteEntranceExit(entranceExitId) {
  return API.delete(`entrance_exits/${entranceExitId}`)
}

async function getEntranceExits(frenchSceneId) {
  return API.request(`french_scenes/${frenchSceneId}/entrance_exits`)
}

async function updateServerEntranceExit(entranceExit, entranceExitId) {
  return API.put(`entrance_exits/${entranceExitId}`, {
    entrance_exit: entranceExit
  })
}

export {createEntranceExit, deleteEntranceExit, getEntranceExits, updateServerEntranceExit}
