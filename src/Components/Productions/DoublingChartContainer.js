import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import DoublingChartShow from "./DoublingChartShow";
import Modal from "../Modal";
import { Spinner } from "../Loaders";
import CastList from "../Jobs/CastList";
import { getPlayScript } from "../../api/plays";
import { useProductionState } from "../../lib/productionState";
export default function DoublingChartContainer() {
  const {
    actors,
    castings,
    fullPlay,
    setFullPlay,
    loading,
    production,
    updateProductionPlay,
  } = useProductionState();
  const [playLoading, setPlayLoading] = useState(true);

  useEffect(async () => {
    if (production.play && !fullPlay) {
      let response = await getPlayScript(production.play.id);
      if (response.status >= 400) {
        console.log("error getting full play text");
      } else {
        setFullPlay(response.data);
        setPlayLoading(false);
        updateProductionPlay(response.data);
      }
    }
  }, [JSON.stringify(production)]);

  if (
    (loading && playLoading) ||
    !castings ||
    !production.play ||
    !production.play.acts ||
    !production.play.acts.length > 0
  ) {
    return (
      <Modal>
        <h1>Loading doubling chart!</h1>
        <Spinner />
      </Modal>
    );
  } else {
    return (
      <>
        <CastList />
        <div>
          Orange indicates one actor playing two characters in an
          act/scene/french scene. A character name in parenthesis indicates that
          the character is onstage but (in your cut) doesn't talk.
        </div>
        {production.play?.acts?.length > 0 && (
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
}
