import _ from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingModal from "../LoadingModal";

import { getProductionNames } from "../../api/productions";

export default function ProductionsList() {
  const [loading, setLoading] = useState(true);
  const [productions, setProductions] = useState([]);

  useEffect(async () => {
    const response = await getProductionNames();
    if (response.status >= 400) {
      console.log("error loading productions");
    } else {
      let uniqProductions = _.uniqBy(response.data, "id");
      setProductions(uniqProductions);
    }
    setLoading(false);
  }, []);
  if (loading) {
    return <LoadingModal displayText="Loading productions" />;
  }

  let productionsLI = productions.map((production) => (
    <li key={production.id}>
      {" "}
      <Link to={`/productions/${production.id}`}>
        {production.play ? production.play.title : "A play"} at{" "}
        {production.theater.name || "A theater"}
      </Link>
    </li>
  ));
  return (
    <div>
      <em>
        Don't see a recently added production? Reload the page in a minute; it
        can take a while for our robots to build your workspace.
      </em>
      <ul>{productionsLI}</ul>
    </div>
  );
}
