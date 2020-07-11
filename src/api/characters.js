import API from './api'

async function createCharacter(playId, character) {
  return API.post(
    `plays/${playId}/characters`, {
      character
    }
  )
}

async function deleteCharacter(characterId) {
  return API.delete(`characters/${characterId}`)
}

async function getCharacter(characterId) {
  return API.request(`characters/${characterId}`)
}

async function getCharacters(playId) {
  return API.request(`plays/${playId}/characters`)
}

async function updateServerCharacter(character) {
  return API.put(`characters/${character.id}`, {
    character: character
  })
}

export {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateServerCharacter
}