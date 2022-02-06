import { useEffect, useState } from "react";
import {
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../../../utils/playScriptUtils.js";
import PartScriptTextContainer from "./PartScriptTextContainer.js";

export default function CharacterParts({ character, play }) {
  const [showCut, setShowCut] = useState(true);
  const [text, setText] = useState([]);

  useEffect(() => {
    let frenchScenes = getFrenchScenesFromPlay(play);

    setText(mergeTextFromFrenchScenes(frenchScenes));
  }, []);

  return (
    <PartScriptTextContainer
      characterIds={[character.id]}
      name={character.name}
      showCut={showCut}
      setShowCut={setShowCut}
      text={text}
    />
  );
}
