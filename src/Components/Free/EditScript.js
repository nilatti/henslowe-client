import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  EditAreaStyles,
  EditScriptStyles,
} from "../Plays/PlayScripts/ScriptStyles";
import TextEdit from "./TextEdit";
import TextSelect from "../Plays/PlayScripts/TextSelect";
import { usePlayState } from "../../lib/freePlayState";
import {
  determineTypeOfLine,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../utils/playScriptUtils";

export default function EditScript({ linesPerMinute }) {
  const { determineTypeOfLine, getSelectedText, play, updateLine } =
    usePlayState();
  const [selectedText, setSelectedText] = useState({});
  const [text, setText] = useState({});
  const [textUnit, setTextUnit] = useState();

  function loadText(textMenuKey) {
    ///extract this from here and pull text directly from play state, I think
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

  return (
    <EditScriptStyles>
      <h2>
        <Link to={`/plays/${play.id}`}>{play.title}</Link>
      </h2>
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
