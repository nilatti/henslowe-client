import { UserLink } from "../../utils/actorUtils.js";

export default function ProductionJobListItem({ handleDeleteJob, job, role }) {
  return (
    <li key={job.id}>
      {job.specialization.title}:{" "}
      {job.user ? <UserLink user={job.user} /> : "Unfilled"}
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
  );
}
