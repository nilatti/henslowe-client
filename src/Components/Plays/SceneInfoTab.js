import { useState } from "react";
import FrenchSceneInfoTab from "./FrenchSceneInfoTab";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { filterEmptyContent } from "../../utils/playScriptUtils";
import TextInfo from "./TextInfo";

export default function SceneInfoTab({ prettyName, scene }) {
  const [key, setKey] = useState();
  function handleSelect(key) {
    setKey(key);
  }
  let frenchSceneTabs;
  if (scene.french_scenes[0]) {
    frenchSceneTabs = filterEmptyContent(scene.french_scenes).map(
      (frenchScene) => {
        let fsPrettyName = `${prettyName}.${frenchScene.number}`;
        return (
          <Tab
            eventKey={`french_scene-${frenchScene.id}`}
            title={`${fsPrettyName}`}
            key={`french_scene-${frenchScene.id}`}
          >
            <FrenchSceneInfoTab
              frenchScene={frenchScene}
              prettyName={fsPrettyName}
            />
          </Tab>
        );
      }
    );
  } else {
    frenchSceneTabs = <div>Nothing to show here</div>;
  }
  return (
    <div>
      <TextInfo item={scene} prettyName={prettyName} type="scene" />
      <Row>
        <h2>French Scenes</h2>
      </Row>
      <Tabs activeKey={key} onSelect={handleSelect} id="french-scene-info-tabs">
        {frenchSceneTabs}
      </Tabs>
    </div>
  );
}
