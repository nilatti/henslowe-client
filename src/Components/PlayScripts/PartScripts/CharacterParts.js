import { useEffect, useState } from "react";
import { Button } from "../../Button";
import {
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../../utils/playScriptUtils";
import PartScriptTextContainer from "./PartScriptTextContainer";

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
      text={text}
    />
  );
}
