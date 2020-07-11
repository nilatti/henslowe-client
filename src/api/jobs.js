import API from './api'

async function createJob(job) {
  return API.post(
    'jobs', {
      job
    }
  )
}

async function deleteJob(jobId) {
  return API.delete(`jobs/${jobId}`)
}

async function getActorsForProduction(productionId) {
  return API.request(`jobs/get_actors_for_production`, {
    params: {
      production: productionId,
    }
  })
}

async function getActorsAndAuditionersForProduction(productionId) {
  return API.request(`jobs/get_actors_and_auditioners_for_production`, {
    params: {
      production: productionId,
    }
  })
}

async function getActorsAndAuditionersForTheater(theaterId) {
  return API.request(`jobs/get_actors_and_auditioners_for_theater`, {
    params: {
      theater: theaterId,
    }
  })
}

async function getJob(jobId) {
  return API.request(`jobs/${jobId}`)
}

async function getJobNames() {
  return API.request(`jobs/job_names`)
}

async function getJobs({production_id = '', specialization_id = '', theater_id = '', user_id = ''}) {
  return API.request(`jobs`, {
    params: {
      production: production_id,
      specialization: specialization_id,
      theater: theater_id,
      user: user_id,
    }
  }
  )
}
async function updateServerJob(job) {
  return API.put(`jobs/${job.id}`, {
    job: job
  })
}
export {
  createJob,
  deleteJob,
  getActorsForProduction,
  getActorsAndAuditionersForProduction,
  getActorsAndAuditionersForTheater,
  getJob,
  getJobNames,
  getJobs,
  updateServerJob
}
