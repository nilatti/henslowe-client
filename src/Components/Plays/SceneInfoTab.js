import { useEffect, useState } from "react";
import { Row, Tab, Tabs } from "react-bootstrap";
import FrenchSceneInfoTab from "./FrenchSceneInfoTab";
import NewTextItem from "./NewTextItem";
import TextInfo from "./TextInfo";
import { filterEmptyContent } from "../../utils/playScriptUtils";

export default function SceneInfoTab({ prettyName, scene }) {
  const [key, setKey] = useState();
  const [frenchSceneTabs, setFrenchSceneTabs] = useState([]);
  const [lastFrenchScene, setLastFrenchScene] = useState();

  useEffect(() => {
    if (scene.french_scenes.length) {
      let workingFrenchSceneTabs = filterEmptyContent(scene.french_scenes).map(
        (frenchScene) => {
          return (
            <Tab
              eventKey={`french_scene-${frenchScene.id}`}
              title={`${frenchScene.pretty_name}`}
              key={`french_scene-${frenchScene.id}`}
            >
              <FrenchSceneInfoTab
                actId={scene.act_id}
                frenchScene={frenchScene}
                prettyName={frenchScene.pretty_name}
              />
            </Tab>
          );
        }
      );
      setFrenchSceneTabs(workingFrenchSceneTabs);
      setLastFrenchScene(scene.french_scenes[scene.french_scenes.length - 1]);
    }
  }, [JSON.stringify(scene.french_scenes)]);
  function handleSelect(key) {
    setKey(key);
  }

  return (
    <div>
      <TextInfo
        item={scene}
        parentId={scene.act_id}
        parentType="act"
        prettyName={scene.pretty_name}
        type="scene"
      />
      <Row>
        <h2>French Scenes</h2>
      </Row>
      <Tabs activeKey={key} onSelect={handleSelect} id="french-scene-info-tabs">
        {frenchSceneTabs}
        <Tab
          eventKey={`new-french-scene`}
          key={`new-french-scene`}
          title={`Add New French Scene`}
        >
          <NewTextItem
            number={String.fromCharCode(
              lastFrenchScene?.number.charCodeAt(0) + 1
            )}
            parentId={scene.id}
            parentType="scene"
            setKey={setKey}
            startPage={lastFrenchScene?.end_page || 0}
            type="french_scene"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
