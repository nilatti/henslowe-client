import _ from "lodash";
import { Link } from "react-router-dom";

import { UserLink } from "./actorUtils";

export function groupCastingByActor(availableActors, castings) {
  let grouped = _.groupBy(castings, "user_id");
  let actorIds = _.compact(Object.keys(grouped));
  return actorIds.map((actorId) => {
    if (actorId !== null) {
      let actor = _.find(availableActors, ["id", _.toNumber(actorId)]);
      if (actor) {
        let actorGroup = grouped[actorId];
        let characters = actorGroup.map((item) => item.character);
        let characterNames = characters.map((character) => character.name);
        return (
          <li key={actorId}>
            <UserLink user={actor} />: {_.join(characterNames, ", ")}
          </li>
        );
      }
    }
  });
}

export function groupByTheater(jobs) {
  let grouped = _.groupBy(jobs, "theater_id");
  let theaterIds = _.compact(Object.keys(grouped));
  return theaterIds.map((theaterId) => {
    if (theaterId !== null) {
      let theaterGroup = grouped[theaterId];
      let groupedByProduction = _.groupBy(theaterGroup, "production_id");
      let nonProductionJobs = groupedByProduction["null"];
      let nonProductionJobsForTheater;
      if (nonProductionJobs) {
        let nonProductionJobTitles = nonProductionJobs.map(
          (job) => job.specialization.title
        );
        nonProductionJobsForTheater = (
          <li key={theaterId}>{nonProductionJobTitles.join(", ")}</li>
        );
      }
      let productionIds = _.compact(Object.keys(groupedByProduction));
      let productionsForTheater = productionIds.map((productionId) => {
        if (productionId >= 1) {
          let productionJobTitles = groupedByProduction[productionId].map(
            (productionJob) => {
              if (
                productionJob.specialization.title === "Actor" &&
                productionJob.character
              ) {
                return productionJob.character.name;
              } else {
                return productionJob.specialization.title;
              }
            }
          );
          return (
            <li key={productionId}>
              <Link to={`/productions/${productionId}`}>
                {groupedByProduction[productionId][0].production.play?.title}
              </Link>
              : {productionJobTitles.join(", ")}
            </li>
          );
        }
      });
      if (nonProductionJobs) {
        productionsForTheater.unshift(nonProductionJobsForTheater);
      }
      let theaterName = theaterGroup[0]?.theater?.name;
      return (
        <li key={theaterId}>
          <Link to={`/theaters/${theaterId}`}>{theaterName}</Link>:{" "}
          <ul>{productionsForTheater}</ul>
        </li>
      );
    }
  });
}
