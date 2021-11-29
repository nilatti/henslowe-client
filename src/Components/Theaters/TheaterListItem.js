import { Link } from "react-router-dom";
export default function TheaterListItem({ theater }) {
  return (
    <li key={theater.id}>
      <Link
        to={{
          pathname: `/theaters/${theater.id}`,
        }}
      >
        {theater.name}
      </Link>
    </li>
  );
}
