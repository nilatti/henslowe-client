import _ from "lodash";
import { Link } from "react-router-dom";

import ActorTrack from "./ActorTrack";
import { buildUserName } from "../../../utils/actorUtils";
export default function ActorShow({ actor }) {
  // toggleShowActorTrack = () => {
  //   this.setState({
  //     showActorTrack: !this.state.showActorTrack,
  //   });
  // };

  // actingJobs(jobs) {
  //   let acting = jobs.filter((job) => job.specialization.title === "Actor");
  //   acting = acting.map((job) => {
  //     if (job.character) {
  //       return job.character.name;
  //     } else {
  //       return;
  //     }
  //   });
  //   acting = _.compact(acting);
  //   let joined = _.join(acting, ", ");
  //   return joined;
  // }

  let actingJobs = actor.jobs.map(
    (job) =>
      (job.character && job.character.name) ||
      (job.character_group && job.character_group.name)
  );
  return (
    <li>
      <Link to={`/users/${actor.id}`}>{buildUserName(actor)}</Link>:{" "}
      {actingJobs.join(", ")}
    </li>
  );
  // }
}
