import { useEffect, useState } from "react";

import {
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../../../utils/playScriptUtils.js";
import PartScriptTextContainer from "./PartScriptTextContainer.js";
import { buildUserName } from "../../../../utils/actorUtils.js";

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
    <PartScriptTextContainer
      characterIds={characterIds}
      name={buildUserName(actor)}
      showCut={showCut}
      setShowCut={setShowCut}
      text={text}
    />
  );
}
