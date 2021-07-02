import { Link } from "react-router-dom";
import { useMeState } from "../../lib/meState";
import { Button } from "../Button";

export default function TheatersList({ theaters }) {
  const { me } = useMeState();
  let theatersList = theaters.map((theater) => (
    <li key={theater.id}>
      <Link
        to={{
          pathname: `/theaters/${theater.id}`,
        }}
      >
        {theater.name}
      </Link>
    </li>
  ));

  return (
    <div>
      <ul>{theatersList}</ul>
      {me.role === "superadmin" && (
        <Link to="/theaters/new">
          <Button>Add New</Button>
        </Link>
      )}
    </div>
  );
}
