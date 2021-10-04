import { useEffect, useState } from "react";
import JobForm from "./JobForm";
import JobListItem from "./JobListItem";
import { Button } from "../Button";

export default function JobsList({
  handleDeleteJob,
  jobs,
  onFormSubmit,
  production,
  role,
}) {
  const [formattedJobs, setFormattedJobs] = useState([]);
  const [newJobFormOpen, setNewJobFormOpen] = useState(false);
  useEffect(() => {
    const jobsLI = jobs.map((job) => (
      <JobListItem
        job={job}
        role={role}
        key={job.id}
        handleDeleteJob={handleDeleteJob}
      />
    ));
    setFormattedJobs(jobsLI);
  }, [jobs]);

  function toggleNewJobForm() {
    setNewJobFormOpen(!newJobFormOpen);
  }
  return (
    <div>
      <ul>{formattedJobs}</ul>
      {role == "admin" && (
        <Button onClick={toggleNewJobForm}>Add a new job</Button>
      )}
      {newJobFormOpen && role == "admin" && (
        <JobForm
          production={production}
          onFormClose={toggleNewJobForm}
          onFormSubmit={onFormSubmit}
        />
      )}
    </div>
  );
}
