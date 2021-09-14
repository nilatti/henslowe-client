import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import DoublingChartShow from "./DoublingChartShow";
import Modal from "../Modal";
import { Spinner } from "../Loaders";
import { useProductionState } from "../../lib/productionState";
export default function DoublingChartContainer() {
  const { actors, castings, loading, production } = useProductionState();
  const [playLoading, setPlayLoading] = useState(true);

  useEffect(() => {
    if (production.play?.acts?.length > 0) {
      setPlayLoading(false);
    }
  }, [JSON.stringify(production)]);
  if (loading && playLoading) {
    return (
      <Modal>
        <h1>Loading doubling chart!</h1>
        <Spinner />
      </Modal>
    );
  }
  return (
    <>
      {production.play && (
        <h2>
          Doubling Charts for{" "}
          <Link to={`/productions/${production.id}`}>
            {production.play.title}
          </Link>
        </h2>
      )}
      <Tabs>
        <Tab eventKey="acts" title="Acts">
          <DoublingChartShow
            actors={actors}
            castings={castings}
            level="act"
            production={production}
          />
        </Tab>
        <Tab eventKey="scenes" title="Scenes">
          <DoublingChartShow
            actors={actors}
            castings={castings}
            level="scene"
            production={production}
          />
        </Tab>
        <Tab eventKey="french_scenes" title="French Scenes">
          <DoublingChartShow
            actors={actors}
            castings={castings}
            level="french_scene"
            production={production}
          />
        </Tab>
      </Tabs>
    </>
  );
}
