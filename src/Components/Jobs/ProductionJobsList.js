import { useEffect, useState } from "react";
import JobForm from "./JobForm.js";
import ProductionJobListItem from "./ProductionJobListItem.js";
import { Button } from "../Button.js";

export default function ProductionJobsList({
  handleDeleteJob,
  jobs,
  onFormSubmit,
  production,
  role,
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
          production={production}
          onFormClose={toggleNewJobForm}
          onFormSubmit={onFormSubmit}
        />
      )}
    </div>
  );
}
