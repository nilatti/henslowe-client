import { useEffect, useState } from "react";
import styled from "styled-components";
import TextEdit from "./TextEdit";
import TextSelect from "./TextSelect";

import {
  calculateRunTime,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../utils/playScriptUtils";

const EditAreaStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const EditScriptStyles = styled.div`
  padding-top: 40px;
  text-align: center;
`;
export default function EditScript({
  getSelectedText,
  linesPerMinute,
  playSkeleton,
  selectedText,
}) {
  const [lines, setLines] = useState({});
  useEffect(() => {
    let frenchScenes = [];
    let text = [];
    if (selectedText?.textUnit === "play") {
      frenchScenes = getFrenchScenesFromPlay(selectedText);
    } else if (selectedText?.textUnit === "act") {
      frenchScenes = getFrenchScenesFromAct(selectedText);
    } else if (selectedText?.textUnit === "scene") {
      frenchScenes = selectedText.french_scenes;
    } else if (selectedText?.textUnit === "frenchScene") {
      setLines(selectedText);
      return;
    }
    text = mergeTextFromFrenchScenes(frenchScenes);
    setLines(text);
  }, [selectedText]);
  async function loadText(textMenuKey) {
    let textUnit = "";
    let slashes = textMenuKey.match(/\//g)?.length;
    let isPlay = textMenuKey.match(/play/);
    if (isPlay) {
      textUnit = "play";
    } else if (!slashes) {
      textUnit = "act";
    } else if (slashes === 1) {
      textUnit = "scene";
    } else if (slashes === 2) {
      textUnit = "frenchScene";
    }
    getSelectedText(textMenuKey, textUnit);
  }
  return (
    <EditScriptStyles>
      <h2>{playSkeleton.title}</h2>
      {/* <Button onClick={() => this.toggleShowCut()}>
          {this.state.showCut ? <span>Hide</span> : <span>Show</span>} Text Cuts
        </Button> */}
      <div className="instructions">
        To edit text, double-click on it.
        {playSkeleton.canonical ? (
          <p>This text is the master text of the play. Edit with caution!</p>
        ) : (
          <span></span>
        )}
      </div>
      <EditAreaStyles>
        <TextSelect playSkeleton={playSkeleton} loadText={loadText} />
        <TextEdit
          selectedText={selectedText}
          lines={lines}
          linesPerMinute={linesPerMinute}
        />
      </EditAreaStyles>
    </EditScriptStyles>
  );
}
