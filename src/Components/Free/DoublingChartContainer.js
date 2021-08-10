import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import { usePlayState } from "../../lib/freePlayState";
import DoublingChartShow from "../Productions/DoublingChartShow";

export default function DoublingChartContainer({}) {
  const { castings, fakeActorsArray, play } = usePlayState();

  let production = { jobs: castings, play: play };
  let castingsWithActors = castings.filter((casting) => casting.user);
  if (!castingsWithActors.length) {
    return (
      <div>
        You don't have any actors cast.
        <br />
        <Link to="/casting">Go to cast some people</Link> and then come back
        here.
      </div>
    );
  }

  return (
    <>
      <Tabs>
        <Tab eventKey="acts" title="Acts">
          <DoublingChartShow
            actors={fakeActorsArray}
            castings={castings}
            level="act"
            production={production}
          />
        </Tab>
        <Tab eventKey="scenes" title="Scenes">
          <DoublingChartShow
            actors={fakeActorsArray}
            castings={castings}
            level="scene"
            production={production}
          />
        </Tab>
        <Tab eventKey="french_scenes" title="French Scenes">
          <DoublingChartShow
            actors={fakeActorsArray}
            castings={castings}
            level="french_scene"
            production={production}
          />
        </Tab>
      </Tabs>
    </>
  );
}
