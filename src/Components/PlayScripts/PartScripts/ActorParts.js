import { useEffect, useState } from "react";
import { Button } from "../../Button";
import {
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../../utils/playScriptUtils";
import PartScriptTextContainer from "./PartScriptTextContainer";
import { buildUserName } from "../../../utils/actorUtils";

export default function ActorParts({ actor, play }) {
  const [showCut, setShowCut] = useState(true);
  const [text, setText] = useState([]);
  const [characterIds, setCharacterIds] = useState([]);

  useEffect(() => {
    setCharacterIds(
      actor.jobs.map((job) => {
        return job.character_id;
      })
    );
  }, []);

  useEffect(() => {
    let frenchScenes = getFrenchScenesFromPlay(play);

    setText(mergeTextFromFrenchScenes(frenchScenes));
  }, []);

  if (!characterIds[0]) {
    <div>Loading</div>;
  }

  return (
    <div>
      <h3>Part Script for {buildUserName(actor)}</h3>
      <div>
        <Button
          colorProp="var(--color-text-light)"
          backgroundColor="var(--color-med)"
          borderColor="var(--color-dark)"
          onClick={() => setShowCut(!showCut)}
        >
          {showCut ? <span>Hide</span> : <span>Show</span>} Text Cuts
        </Button>
      </div>
      <div>
        <PartScriptTextContainer
          characterIds={characterIds}
          showCut={showCut}
          text={text}
        />
      </div>
    </div>
  );
}
