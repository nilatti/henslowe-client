import { Link } from "react-router-dom";

export default function ProductionInfoTab({ production }) {
  return (
    <div>
      <h2>
        <Link to={`/productions/${production.id}`}>
          {production.play ? production.play.title : "A play"}
        </Link>
      </h2>
      <p>
        {production.start_date} - {production.end_date}
      </p>
      <hr />
    </div>
  );
}
