import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import JobListItem from "./JobListItem";

export default function JobsListExcludingActorsAndAuditioners({
  production,
  role,
}) {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [newJobFormOpen, setNewJobFormOpen] = useState(false);
  useEffect(() => {
    let filtered = production.jobs
      .filter(
        (job) =>
          job.specialization.title !== "Actor" &&
          job.specialization.title !== "Auditioner"
      )
      .map((job) => <JobListItem job={job} role={role} key={job.id} />);
    setFilteredJobs(filtered);
  }, []);

  return (
    <div>
      <ul>{filteredJobs}</ul>
      <Button>Add a new job</Button>
    </div>
  );
}
