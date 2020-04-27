import API from './api'

async function createSpecialization(specialization) {
  return API.post(
    'specializations', {
      specialization
    }
  )
}

async function deleteSpecialization(specializationId) {
  return API.delete(`specializations/${specializationId}`)
}

async function getSpecialization(specializationId) {
  return API.request(`specializations/${specializationId}`)
}

async function getSpecializations() {
  return API.request(`specializations`)
}

async function updateServerSpecialization(specialization) {
  return API.put(`specializations/${specialization.id}`, {
    specialization: specialization
  })
}

export {
  createSpecialization,
  deleteSpecialization,
  getSpecialization,
  getSpecializations,
  updateServerSpecialization
}
