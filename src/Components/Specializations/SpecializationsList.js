import { Link } from "react-router-dom";

export default function SpecializationsList({ specializations }) {
  let specializationsList = specializations.map((specialization) => (
    <li key={specialization.id}>
      <Link
        to={{
          pathname: `/specializations/${specialization.id}`,
        }}
      >
        {specialization.title}
      </Link>
    </li>
  ));

  return (
    <div>
      <ul>{specializationsList}</ul>
      <Link to="/specializations/new">Add New</Link>
    </div>
  );
}
