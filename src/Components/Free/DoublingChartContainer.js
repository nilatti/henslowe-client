import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import { usePlayState } from "../../lib/freePlayState";
import DoublingChartShow from "../Productions/DoublingChartShow";

export default function DoublingChartContainer({}) {
  const { castings, fakeActorsArray, play } = usePlayState();

  let production = { jobs: castings, play: play };
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
