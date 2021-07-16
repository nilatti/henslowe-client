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
    <div>
      <h3>Part Script for {character.name || character.xml_id}</h3>
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
          characterIds={[character.id]}
          showCut={showCut}
          text={text}
        />
      </div>
    </div>
  );
}
