import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import TextInfo from "./TextInfo";

import SceneInfoTab from "./SceneInfoTab";

import { filterEmptyContent } from "../../utils/playScriptUtils";

export default function ActInfoTab({ act }) {
  const [key, setKey] = useState();

  function handleSelect(key) {
    setKey(key);
  }

  let sceneTabs;
  if (act.scenes[0]) {
    sceneTabs = filterEmptyContent(act.scenes).map((scene) => {
      let prettyName = `${act.number}.${scene.number}`;

      return (
        <Tab
          eventKey={`scene-${scene.id}`}
          title={`${prettyName}`}
          key={`scene-${scene.id}`}
        >
          <SceneInfoTab prettyName={prettyName} scene={scene} type={scene} />
        </Tab>
      );
    });
  } else {
    sceneTabs = <div>No scenes found</div>;
  }
  return (
    <div>
      <TextInfo item={act} type="act" prettyName={`Act ${act.number}`} />
      <div>
        <h2>Scenes</h2>
      </div>
      <Tabs activeKey={key} onSelect={handleSelect} id="scene-info-tabs">
        {sceneTabs}
      </Tabs>
    </div>
  );
}
