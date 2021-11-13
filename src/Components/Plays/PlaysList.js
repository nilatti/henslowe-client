import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPlayTitles } from "../../api/plays";

export default function PlaysList() {
  const [plays, setPlays] = useState([]);

  useEffect(async () => {
    let response = await getPlayTitles();
    if (response.status >= 400) {
      console.log("error fetching plays");
    } else {
      setPlays(
        response.data.map((play) => (
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
