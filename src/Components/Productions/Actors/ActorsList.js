import _ from "lodash";
import { useEffect, useState } from "react";

import { sortUsers } from "../../../utils/actorUtils";

import ActorShow from "./ActorShow";
import ActorTrack from "./ActorTrack";
import { useProductionState } from "../../../lib/productionState";

export default function ActorsList() {
  const { jobsActing, actors } = useProductionState();
  const [workingActors, setWorkingActors] = useState([]);
  useEffect(() => {
    setWorkingActors(actors);
  }, []);

  useEffect(() => {
    let actorsWithJobs = actors.map((actor) => {
      let actorJobs = jobsActing.filter((job) => job.user_id == actor.id);
      return { ...actor, jobs: actorJobs };
    });
    setWorkingActors(actorsWithJobs);
  }, [JSON.stringify(jobsActing), JSON.stringify(actors)]);
  return (
    <div>
      <h2>Actors</h2>
      <ul>
        {workingActors.map((actor) => (
          <ActorShow actor={actor} key={actor.id} />
        ))}
      </ul>
    </div>
  );
}

//   getUniqActors() {
//     let allJobs = this.getActorJobs()
//     if (allJobs.length > 0){
//       let uniqActors = {}
//       _.forEach(allJobs, function(job) {
//         if (!uniqActors.hasOwnProperty(job.user.id)) {
//           uniqActors[job.user.id] = {
//             actor: job.user,
//             jobs: [job]
//           }
//         } else {
//           uniqActors[job.user.id]['jobs'].push(job)
//         }
//       })

//       uniqActors = sortUsers(uniqActors)

//       return uniqActors
//     } else {
//       return {}
//     }

//   }

//   render() {
//     let actorObjs = Object.values(this.getUniqActors())
//     let actors = actorObjs.map((obj) =>
//       <li key={obj.actor.id}>
//         <ActorShow
//           actorObj={obj}
//           production={this.props.production}
//         />
//       </li>
//     )
//     return (
//       <Col md={12}>
//         <h2>Actors</h2>
//         <ul>
//           {actors}
//         </ul>
//       </Col>
//     )
//   }
// }

// ActorsList.propTypes = {
//   production: PropTypes.object.isRequired,
// }

// export default ActorsList
