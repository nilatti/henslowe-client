import { Link } from "react-router-dom";
import { buildUserName } from "../../utils/actorUtils";

export default function JobListItem({ job, role }) {
  let name = job.user ? buildUserName(job.user) : "";
  let link = job.user ? <Link to={`/users/${job.user.id}`}>{name}</Link> : "";
  console.log("role", role);
  return (
    <li key={job.id}>
      {link}: {job.specialization.title}
      {role == "admin" && (
        <>
          <span
            className="right floated trash icon"
            onClick={() => {
              onDeleteClick(production.id);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </>
      )}
    </li>
  );
}
