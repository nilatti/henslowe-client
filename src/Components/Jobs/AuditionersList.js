import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobForm from "./JobForm";
import { Button } from "../Button";
import { getItem } from "../../api/crud";
import { buildUserName } from "../../utils/actorUtils";
import { AUDITIONER_SPECIALIZATION_ID } from "../../utils/hardcodedConstants";
import { useProductionState } from "../../lib/productionState";
export default function AuditionersList({
  handleDeleteJob,
  onFormSubmit,
  role,
}) {
  const { jobsAuditioned, production } = useProductionState();
  const [auditionerSpecialization, setAuditionerSpecialization] = useState();
  const [formattedJobs, setFormattedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newJobFormOpen, setNewJobFormOpen] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const response = await getItem(
      AUDITIONER_SPECIALIZATION_ID,
      "specialization"
    );
    if (response.status >= 400) {
      console.log("error getting specialization");
    } else {
      setAuditionerSpecialization(response.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let sortedJobs = _.sortBy(jobsAuditioned, [
      "user.gender",
      "user.last_name",
    ]);
    let formatted = sortedJobs.map((job) => (
      <li key={job.id}>
        {job.user.fake ? (
          <em style={{ color: "var(--fake-actor)" }}>
            {buildUserName(job.user)}
          </em>
        ) : (
          <Link to={`/users/${job.id}`}> {buildUserName(job.user)}</Link>
        )}
        {role == "admin" && (
          <>
            <span
              className="right floated trash icon"
              onClick={() => {
                handleDeleteJob(job.id);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </>
        )}
      </li>
    ));
    setFormattedJobs(formatted);
  }, [jobsAuditioned]);

  function toggleNewJobForm() {
    setNewJobFormOpen(!newJobFormOpen);
  }
  if (loading) {
    return <div>Loading!</div>;
  }
  return (
    <div>
      <div>
        <em style={{ color: "var(--fake-actor)" }}>
          Fake actors are listed in teal
        </em>
      </div>
      <ul>{formattedJobs}</ul>
      {role == "admin" && (
        <Button onClick={toggleNewJobForm}>Add a new auditioner</Button>
      )}
      {newJobFormOpen && role == "admin" && (
        <JobForm
          production={production}
          specialization={auditionerSpecialization}
          onFormClose={toggleNewJobForm}
          onFormSubmit={onFormSubmit}
        />
      )}
    </div>
  );
}
