import { useEffect, useState } from "react";
import JobForm from "./JobForm";
import ProductionJobListItem from "./ProductionJobListItem";
import { Button } from "../Button";

export default function TheaterJobsList({
  handleDeleteJob,
  jobs,
  onFormSubmit,
  role,
  theater,
}) {
  const [formattedJobs, setFormattedJobs] = useState([]);
  const [newJobFormOpen, setNewJobFormOpen] = useState(false);

  useEffect(() => {
    const jobsLI = jobs?.map((job) => (
      <ProductionJobListItem
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
          includeProduction={false}
          onFormClose={toggleNewJobForm}
          onFormSubmit={onFormSubmit}
          theater={theater}
        />
      )}
    </div>
  );
}
