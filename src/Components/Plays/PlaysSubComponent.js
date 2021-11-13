import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function PlaysSubComponent({ plays }) {
  const [playLIs, setPlayLIs] = useState([]);
  useEffect(() => {
    setPlayLIs(
      plays.map((play) => (
        <li key={play.id}>
          <Link to={`/plays/${play.id}`}>{play.title}</Link>
        </li>
      ))
    );
  }, [plays]);

  return (
    <div id="plays">
      <ul>{plays}</ul>
    </div>
  );
}
