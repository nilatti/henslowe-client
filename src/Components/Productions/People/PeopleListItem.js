import _ from "lodash";

import ActorTrack from "./ActorTrack.js";
import { UserLink } from "../../../utils/actorUtils.js";
export default function PeopleListItem({ person }) {
  // toggleShowActorTrack = () => {
  //   this.setState({
  //     showActorTrack: !this.state.showActorTrack,
  //   });
  // };

  let jobs = person.jobs.map(
    (job) =>
      (job.character && job.character.name) ||
      (job.character_group && job.character_group.name) ||
      job.specialization.title
  );
  return (
    <li>
      <UserLink user={person} />: {jobs.join(", ")}
    </li>
  );
}
