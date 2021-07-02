import { Link } from "react-router-dom";

export default function SpacesList({ spaces }) {
  let spacesList = spaces.map((space) => (
    <li key={space.id}>
      <Link
        to={{
          pathname: `/spaces/${space.id}`,
        }}
      >
        {space.name}
      </Link>
    </li>
  ));

  return (
    <div>
      <ul>{spacesList}</ul>
      <Link to="/spaces/new">Add New</Link>
    </div>
  );
}
