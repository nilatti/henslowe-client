import API from './api'

async function buildRehearsalSchedule(productionId, rehearsalSchedulePattern) {
  return API.put(`productions/${productionId}/build_rehearsal_schedule`, {
    production: rehearsalSchedulePattern
  })
}
async function createProduction(production) {
  return API.post(
    'productions', {
      production
    }
  )
}

async function deleteProduction(productionId) {
  return API.delete(`productions/${productionId}`)
}

async function getProduction(productionId) {
  return API.request(`productions/${productionId}`)
}

async function getProductionNames() {
  return API.request(`productions/production_names`)
}


async function getProductions() {
  return API.request(`productions`)
}

async function getProductionsForTheater(theaterId) {
  return API.request(`productions/get_productions_for_theater`, {
    params: {
      theater: theaterId
    }
  })
}

async function updateServerProduction(production) {
  return API.put(`productions/${production.id}`, {
    production: production
  })
}


export {
  buildRehearsalSchedule,
  createProduction,
  deleteProduction,
  getProduction,
  getProductionNames,
  getProductions,
  getProductionsForTheater,
  updateServerProduction
}
