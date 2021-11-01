import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import NewTextItem from "./NewTextItem";
import SceneInfoTab from "./SceneInfoTab";
import TextInfo from "./TextInfo";

import { filterEmptyContent } from "../../utils/playScriptUtils";

export default function ActInfoTab({ act }) {
  const [key, setKey] = useState();
  const [sceneTabs, setSceneTabs] = useState([]);
  const [lastScene, setLastScene] = useState();

  useEffect(() => {
    if (act.scenes.length) {
      let workingSceneTabs = filterEmptyContent(act.scenes).map((scene) => {
        return (
          <Tab
            eventKey={`scene-${scene.id}`}
            title={`${scene.pretty_name}`}
            key={`scene-${scene.id}`}
          >
            <SceneInfoTab
              prettyName={scene.pretty_name}
              scene={scene}
              type="scene"
            />
          </Tab>
        );
      });
      setSceneTabs(workingSceneTabs);
      setLastScene(act.scenes[act.scenes.length - 1]);
    }
  }, [JSON.stringify(act.scenes)]);

  function handleSelect(key) {
    setKey(key);
  }

  return (
    <div>
      <TextInfo
        item={act}
        parentId={act.play_id}
        parentType="play"
        prettyName={`Act ${act.number}`}
        type="act"
      />
      <div>
        <h2>Scenes</h2>
      </div>
      <Tabs activeKey={key} onSelect={handleSelect} id="scene-info-tabs">
        {sceneTabs}
        <Tab eventKey={`new-scene`} key={`new-scene`} title={`Add New Scene`}>
          <NewTextItem
            number={lastScene?.number + 1 || 0}
            parentId={act.id}
            parentType="act"
            setKey={setKey}
            startPage={lastScene?.end_page || 0}
            type="scene"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
