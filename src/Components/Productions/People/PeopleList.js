import _ from "lodash";
import { useEffect, useState } from "react";

import { sortUsers } from "../../../utils/actorUtils.js";

import PeopleListItem from "./PeopleListItem.js";
import ActorTrack from "./ActorTrack.js";
import { useProductionState } from "../../../lib/productionState.js";

export default function PeopleList() {
  const { jobs, hiredUsers } = useProductionState();
  const [workingPeople, setWorkingPeople] = useState([]);

  useEffect(() => {
    let peopleWithJobs = hiredUsers.map((person) => {
      let personJobs = jobs.filter((job) => job.user_id == person.id);
      return { ...person, jobs: personJobs };
    });
    setWorkingPeople(peopleWithJobs);
  }, [JSON.stringify(jobs), JSON.stringify(hiredUsers)]);
  return (
    <div>
      <h2>People</h2>
      <ul>
        {workingPeople.map((person) => (
          <PeopleListItem person={person} key={person.id} />
        ))}
      </ul>
    </div>
  );
}
