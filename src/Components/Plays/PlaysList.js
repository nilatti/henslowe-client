import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../../hooks/fetchData.js";
import { useErrorState } from "../../lib/errorState.js";
import { getPlayTitles } from "../../api/plays.js";

export default function PlaysList() {
  const { updateErrors } = useErrorState();
  const [loading, setLoading] = useState(false);
  const [plays, setPlays] = useState([]);
  console.log("plays list called");
  useEffect(async () => {
    let response = await fetchData(getPlayTitles, updateErrors, setLoading);
    if (response) {
      setPlays(
        response.map((play) => (
          <li key={play.id}>
            {" "}
            <Link to={`/plays/${play.id}`}>{play.title}</Link>
          </li>
        ))
      );
    }
  }, []);

  return (
    <div>
      <ul>{plays}</ul>
      <Link to="/plays/new">Add New</Link>
    </div>
  );
}
