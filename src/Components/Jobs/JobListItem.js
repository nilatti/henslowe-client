import { Link } from "react-router-dom";
import { buildUserName } from "../../utils/actorUtils";

export default function JobListItem({ handleDeleteJob, job, role }) {
  let name = job.user ? buildUserName(job.user) : "";
  let link = job.user ? <Link to={`/users/${job.user.id}`}>{name}</Link> : "";
  return (
    <li key={job.id}>
      {link}: {job.specialization.title}
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
