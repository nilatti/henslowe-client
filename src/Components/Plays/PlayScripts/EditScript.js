import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditAreaStyles, EditScriptStyles } from "./ScriptStyles";
import TextEdit from "./TextEdit";
import TextSelect from "./TextSelect";
import { usePlayState } from "../../../lib/playState";
import {
  determineTypeOfLine,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../../utils/playScriptUtils";

export default function EditScript({ handleLineSubmit, linesPerMinute }) {
  const { getSelectedText, play, updateLine } = usePlayState();
  const [selectedText, setSelectedText] = useState({});
  const [text, setText] = useState({});
  const [textUnit, setTextUnit] = useState();

  function handleLineSubmit(line) {
    updateLine(line);
    let type = determineTypeOfLine(line);
    let oldLines = text[`${type}s`];
    let newLines = oldLines.map((oldLine) => {
      if (oldLine.id === line.id) {
        return line;
      } else {
        return oldLine;
      }
    });
    let newLinesObj = { ...text };
    newLinesObj[`${type}s`] = newLines;
    setText(newLinesObj);
  }

  function loadText(textMenuKey) {
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
    setTextUnit(textUnit);
    let tempSelectedText = getSelectedText(textMenuKey, textUnit);
    setSelectedText(tempSelectedText);
    let frenchScenes = [];
    let text = [];
    if (textUnit === "play") {
      frenchScenes = getFrenchScenesFromPlay(tempSelectedText);
    } else if (textUnit === "act") {
      frenchScenes = getFrenchScenesFromAct(tempSelectedText);
    } else if (textUnit === "scene") {
      frenchScenes = tempSelectedText.french_scenes;
    } else if (textUnit === "frenchScene") {
      setText(tempSelectedText);
      return;
    }
    text = mergeTextFromFrenchScenes(frenchScenes);
    setText(text);
  }

  return (
    <EditScriptStyles>
      <h2>
        <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </h2>

      <div className="instructions">
        To edit text, double-click on it.
        {play.canonical ? (
          <p>This text is the master text of the play. Edit with caution!</p>
        ) : (
          <span></span>
        )}
      </div>

      <EditAreaStyles>
        <TextSelect play={play} loadText={loadText} />
        <TextEdit
          handleLineSubmit={handleLineSubmit}
          linesPerMinute={linesPerMinute}
          selectedText={selectedText}
          text={text}
        />
      </EditAreaStyles>
    </EditScriptStyles>
  );
}
