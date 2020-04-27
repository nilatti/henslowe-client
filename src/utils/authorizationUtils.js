import _ from 'lodash'
const THEATER_ADMIN = ['Executive Director', 'Artistic Director', 'Technical Director']
// const THEATER_MEMBER = ['Actor']

const PRODUCTION_ADMIN = ['Director', 'Stage Manager']
// const PRODUCTION_MEMBER = ['Actor']

const SUPERUSERS = ['alisha.huber@gmail.com', 'kate@test.com']

export function getUserRoleForTheater(user, theaterId) {
  theaterId = Number(theaterId)
  let theaterJobs = user.jobs.filter((job) => job.theater_id === theaterId)
  let jobTitles = theaterJobs.map((job) => job.specialization.title)
  if (_.intersection(jobTitles, THEATER_ADMIN).length > 0 || getSuperAdminRole(user) === 'superadmin') {
    return "admin"
  } else if (theaterJobs.length > 0) {
      return "member"
  } else {
    return "visitor"
  }
}

export function getUserRoleForProduction(user, production) {
  let productionId = Number(production.id)
  let productionJobs = user.jobs.filter((job) => job.production_id === production.id)
  let jobTitles = productionJobs.map((job) => job.specialization.title)
  if (getUserRoleForTheater(user, production.theater_id) === 'admin' || _.intersection(jobTitles, PRODUCTION_ADMIN).length > 0) {
    return "admin"
  } else if (productionJobs.length > 0) {
      return "member"
  } else {
    return "visitor"
  }
}

export function getUserRoleForSpace(user, space) {
  let theaters = space.theaters
  let role
  theaters.forEach((theater) => {
    if (getUserRoleForTheater(user, theater.id) === 'admin') {
      role = 'theater_admin'
    }
  })
  return role
}

export function getSuperAdminRole(user) {
  if (user && _.includes(SUPERUSERS, user.email)) {
    return 'superadmin'
  } else {
    return ''
  }
}

export function getOverlap(loggedInUser, targetUser) {
  let role = ''
  let targetUserTheaterIds = targetUser.jobs.map((job) => job.theater_id)
  if (getSuperAdminRole(loggedInUser) === 'superadmin') {
    return role = 'superadmin'
  }
  if (loggedInUser.id === targetUser.id) {
   return role = 'self'
  }

  targetUserTheaterIds.map((theaterId) => {
    let targetUserTheaterRole = getUserRoleForTheater(loggedInUser, theaterId)
    if (targetUserTheaterRole === 'admin') {
      role = 'theater_admin'
    } else if (targetUserTheaterRole === 'member') {
      role = 'theater_peer'
    }
  })
  return role
}

export function theatersWhereUserIsAdmin(user, theaters) {
  console.log('admin called')
  let userAdminTheaters = []
  theaters.forEach((theater) => {
    if (getUserRoleForTheater(user, theater.id) === 'admin') {
      userAdminTheaters.push(theater)
    }
  })
  return userAdminTheaters
}
