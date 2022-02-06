import _ from "lodash";
import { checkPropTypes } from "prop-types";
import { useEffect, useState } from "react";

import { UserLink } from "../../utils/actorUtils.js";
export default function SpecializationJobsList({ jobs }) {
  const [formattedUsers, setFormattedUsers] = useState([]);

  useEffect(() => {
    let users = getUsers(jobs);
    let formatted = users.map((user) => {
      return (
        <li key={user.id}>
          <UserLink user={user} />
        </li>
      );
    });
    setFormattedUsers(formatted);
  }, [JSON.stringify(jobs)]);

  function getProductions(jobs) {
    console.log(job);
  }
  function getTheaters(jobs) {
    let userTheaters = _.uniqBy(
      jobs.map((j) => j.theater),
      "theater_id"
    );
    let orderedUserTheaters = _.orderBy(userTheaters, "name");
    let theaterJobs = _.groupBy(jobs, "theater_id");
    theaterJobs.forEach((jobs) => {
      getProductions(jobs);
    });
    return orderedUserTheaters;
  }

  function getUsers(jobs) {
    let users = jobs.map((j) => j.user);
    let filteredUsers = users.filter((u) => u && !u.fake);
    let uniqUsers = _.uniqBy(filteredUsers, "id");
    let sortedUsers = _.sortBy(uniqUsers, ["last_name", "first_name", "email"]);
    let compactUsers = _.compact(sortedUsers);
    return compactUsers;
  }

  //   useEffect(() => {
  //     let filteredJobs = jobs.filter((j) => j.user_id != null);
  //
  //     let uniqUsers = _.uniqBy(users, "id");
  //     let sortedUsers = _.sortBy(uniqUsers, ["last_name", "first_name", "email"]);
  //     let compactUsers = _.compact(sortedUsers);
  //     let byUsers = _.groupBy(filteredJobs, "user_id");
  //     let jobsByUser = compactUsers.map((user) => {
  //       let userJobs = byUsers[user.id];
  //       let userTheaters = _.uniqBy(
  //         userJobs.map((j) => j.theater),
  //         "theater_id"
  //       );
  //       let orderedUserTheaters = _.orderBy(userTheaters, "name");
  //       console.log(userTheaters);
  //       let groupedUserTheaters = _.groupBy(userJobs, "theater_id");

  //       return (
  //         <li key={user?.id}>
  //           <UserLink user={user} />:{" "}
  //           {byUsers[user.id].map((job) => job.theater.name).join(", ")}
  //         </li>
  //       );
  //     });
  //     setFormattedJobs(jobsByUser);
  //     // console.log(byActors);
  //     // const jobsLI = filteredJobs?.map((job) => (
  //     //   <li key={job.id}>
  //     //     {job.user ? <UserLink user={job.user} /> : "Unfilled"}
  //     //   </li>
  //     // ));
  //     // setFormattedJobs(jobsLI);
  //   }, [jobs]);

  //   function userTheaters(userJobs) {
  //     _.uniqBy(
  //         userJobs.map((j) => j.theater),
  //         "theater_id"
  //       );
  //   }
  return (
    <div>
      <ul>{formattedUsers}</ul>
    </div>
  );
}
