import API from './api'

async function createTheater(theater) {
  return API.post(
    'theaters', {
      theater
    }
  )
}

async function deleteTheater(theaterId) {
  return API.delete(`theaters/${theaterId}`)
}

async function getTheater(theaterId) {
  return API.request(`theaters/${theaterId}`)
}

async function getTheaterNames() {
  return API.request(`theaters/theater_names`)
}


async function getTheaters() {
  return API.request(`theaters`)
}

async function updateServerTheater(theater) {
  return API.put(`theaters/${theater.id}`, {
    id: theater.id,
    theater: theater,
  })
}


export {
  createTheater,
  deleteTheater,
  getTheater,
  getTheaterNames,
  getTheaters,
  updateServerTheater
}