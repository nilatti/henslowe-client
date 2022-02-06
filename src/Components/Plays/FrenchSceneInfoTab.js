import TextInfo from "./TextInfo.js";
import OnStagesList from "./OnStages/OnStagesList.js";

export default function FrenchSceneInfoTab({ actId, frenchScene, prettyName }) {
  return (
    <div>
      <TextInfo
        item={frenchScene}
        type="french_scene"
        prettyName={prettyName}
      />
      <div>
        <h3>Characters</h3>
      </div>
      <div>
        <ul>
          <OnStagesList
            actId={actId}
            frenchScene={frenchScene}
            sceneId={frenchScene.scene_id}
          />
        </ul>
      </div>
    </div>
  );
}
