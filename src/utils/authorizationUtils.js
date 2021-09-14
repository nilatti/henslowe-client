import _ from "lodash";
import moment from "moment";
import {
  THEATER_ADMIN,
  THEATER_MEMBER,
  PRODUCTION_ADMIN,
  PRODUCTION_MEMBER,
  SPACE_ADMIN,
  SPACE_MEMBER,
  SUPERUSERS,
} from "./hardcodedConstants";

import { intersection } from "../utils/arrayUtils";
import { getItem } from "../api/crud";
import { getJobs } from "../api/jobs";

export function getOverlap(loggedInUser, targetUser) {
  if (!loggedInUser | !targetUser) return;
  //build an array of roles to analyze at the end and pick the highest access one to return
  let roleArray = [];
  let loggedInUserPastTheaters = loggedInUser.jobs?.filter(
    (job) => moment(job.end_date) < moment()
  );
  if (!loggedInUserPastTheaters) {
    return;
  }
  let loggedInUserPastTheaterIds = loggedInUserPastTheaters?.map(
    (job) => job.theater_id
  );

  let targetUserPastTheaters = targetUser.jobs?.filter(
    (job) => moment(job.end_date) < moment()
  );
  let targetUserPastTheaterIds = targetUserPastTheaters?.map(
    (job) => job.theater_id
  );

  if ((loggedInUserPastTheaterIds, targetUserPastTheaterIds)) {
    let pastTheaterOverlap = intersection(
      loggedInUserPastTheaterIds,
      targetUserPastTheaterIds
    );
    if (pastTheaterOverlap.length) {
      pastTheaterOverlap.some((theaterId) => {
        if (getUserRoleForTheater(loggedInUser, theaterId) === "admin") {
          roleArray.push("past_theater_admin");
          return true;
        } else {
          roleArray.push("past_theater_peer");
          return false;
        }
      });
    }
  }

  // let targetUserCurrentProductionJobs = targetUser.jobs.filter(
  //   (job) => moment(job.end_date) > moment()
  // );

  let loggedInUserPastProductions = loggedInUser.jobs.filter(
    (job) => moment(job.end_date) < moment()
  );
  let loggedInUserPastProductionIds = loggedInUserPastTheaters.map(
    (job) => job.theater_id
  );

  let targetUserPastProductions = targetUser.jobs.filter(
    (job) => moment(job.end_date) < moment()
  );
  let targetUserPastProductionIds = targetUserPastTheaters.map(
    (job) => job.theater_id
  );

  let pastProductionOverlap = intersection(
    loggedInUserPastProductionIds,
    targetUserPastProductionIds
  );
  if (pastProductionOverlap.length) {
    pastProductionOverlap.some((productionId) => {
      if (getUserRoleForProduction(loggedInUser, productionId) === "admin") {
        roleArray.push("past_production_admin");
        return true;
      } else {
        roleArray.push("past_production_peer");
        return false;
      }
    });
  }

  /*does the logged in user CURRENTLY work at the same theater or production as the target user? 
  Is the target user currently working at the same theater or production as the logged in user? */

  //get logged in user and target user CURRENT theater job ids

  let loggedInUserCurrentTheaterJobs = loggedInUser.jobs.filter(
    (job) => moment(job.end_date) > moment()
  );

  let loggedInUserCurrentTheaterJobsIds = loggedInUserCurrentTheaterJobs.map(
    (job) => job.theater_id
  );

  let targetUserCurrentTheaterJobs = targetUser.jobs.filter(
    (job) => moment(job.end_date) > moment()
  );

  let targetUserCurrentTheaterJobsIds = targetUserCurrentTheaterJobs.map(
    (job) => job.theater_id
  );

  let currentTheaterJobsOverlaps = intersection(
    loggedInUserCurrentTheaterJobsIds,
    targetUserCurrentTheaterJobsIds
  );

  //get logged in user and target user CURRENT production job ids

  let loggedInUserCurrentProductionJobs = loggedInUser.jobs.filter(
    (job) => moment(job.end_date) > moment()
  );

  let loggedInUserCurrentProductionJobsIds =
    loggedInUserCurrentProductionJobs.map((job) => job.production_id);

  let targetUserCurrentProductionJobs = targetUser.jobs.filter(
    (job) => moment(job.end_date) > moment()
  );

  let targetUserCurrentProductionJobsIds = targetUserCurrentProductionJobs.map(
    (job) => job.production_id
  );

  let currentProductionJobsOverlaps = intersection(
    loggedInUserCurrentProductionJobsIds,
    targetUserCurrentProductionJobsIds
  );

  //if logged in user is a theater admin, that overrides production admin bc it is higher up
  if (currentTheaterJobsOverlaps || currentProductionJobsOverlaps) {
    currentProductionJobsOverlaps?.some((productionId) => {
      if (getUserRoleForProduction(loggedInUser, productionId) === "admin") {
        roleArray.push("current_production_admin");
        return true;
      } else {
        roleArray.push("current_production_peer");
        return false;
      }
    });
    currentTheaterJobsOverlaps?.some((theaterId) => {
      if (getUserRoleForTheater(loggedInUser, theaterId) === "admin") {
        roleArray.push("current_theater_admin");
        return true;
      } else {
        roleArray.push("current_theater_peer");
        return false;
      }
    });
  }
  return _.uniq(roleArray);
}

export function getSuperAdminRole(user) {
  if (user && _.includes(SUPERUSERS, user.email)) {
    return true;
  } else {
    return false;
  }
}
export function getUserRoleForTheater(user, theaterId) {
  theaterId = Number(theaterId);
  if (getSuperAdminRole(user)) return "admin";
  let theaterJobs = user.jobs.filter((job) => job.theater_id === theaterId);
  if (theaterJobs.length === 0) return "visitor";
  let jobTitles = theaterJobs.map((job) => job.specialization?.title);
  if (_.intersection(jobTitles, THEATER_ADMIN).length > 0) {
    return "admin";
  } else if (theaterJobs.length > 0) {
    return "member";
  }
}

export async function getUserRoleForProduction(user, productionId) {
  let productionJobs = [];
  let jobsResponse = await getJobs({
    user_id: user.id,
    production_id: productionId,
  });

  if (jobsResponse.status >= 400) {
    console.log("error! getting jobs");
  } else {
    productionJobs = jobsResponse.data;
  }

  let production = {};
  console.log("inside auth", productionId);
  let productionResponse = await getItem(productionId, "production");
  console.log(198);
  if (productionResponse.status >= 400) {
    console.log("error getting production");
  } else {
    production = productionResponse.data;
  }

  if (productionJobs.length) {
    let jobTitles = productionJobs.map((job) => job.specialization?.title);
    if (
      getUserRoleForTheater(user, production.theater_id) === "admin" ||
      intersection(jobTitles, PRODUCTION_ADMIN).length > 0 ||
      getSuperAdminRole(user)
    ) {
      return "admin";
    } else {
      return "member";
    }
  } else {
    return "visitor";
  }
}

//currently allowing permissions for people who are admins at partner theaters because we don't have admin roles for spaces or jobs for spaces yet
export function getUserRoleForSpace(user, space) {
  if (!space.theaters) return;
  let theaters = space.theaters;
  let role = "";
  if (!theaters.length && getSuperAdminRole(user)) {
    role = "theater_admin";
  }
  theaters.forEach((theater) => {
    if (
      getUserRoleForTheater(user, theater.id) === "admin" ||
      getSuperAdminRole(user)
    ) {
      role = "theater_admin";
    }
  });
  return role;
}

export function theatersWhereUserIsAdmin(user, theaters) {
  let userAdminTheaters = [];
  theaters.forEach((theater) => {
    if (getUserRoleForTheater(user, theater.id) === "admin") {
      userAdminTheaters.push(theater);
    }
  });
  return userAdminTheaters;
}

export function theatersWhereUserIsMember(user, theaters) {
  let userMemberTheaters = [];
  theaters.forEach((theater) => {
    if (getUserRoleForTheater(user, theater.id) === "member") {
      userMemberTheaters.push(theater);
    }
  });
  return userMemberTheaters;
}

export function productionsWhereUserIsAdmin(user, productions) {
  let userAdminProductions = [];
  productions.forEach((production) => {
    if (getUserRoleForProduction(user, production.id) === "admin") {
      userAdminProductions.push(production);
    }
  });
  return userAdminProductions;
}

export function productionsWhereUserIsMember(user, productions) {
  let userMemberProductions = [];
  productions.forEach((production) => {
    if (getUserRoleForProduction(user, production.id) === "member") {
      userMemberProductions.push(production);
    }
  });
  return userMemberProductions;
}
