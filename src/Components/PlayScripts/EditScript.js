import { useEffect, useState } from "react";
import styled from "styled-components";
import TextEdit from "./TextEdit";
import TextSelect from "./TextSelect";
import {
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from "../../utils/playScriptUtils";

const EditAreaStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const EditScriptStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 40px;
  text-align: center;
`;
export default function EditScript({
  characters,
  getSelectedText,
  handleLineSubmit,
  linesPerMinute,
  playSkeleton,
  selectedText,
}) {
  const [text, setText] = useState({});
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
      setText(selectedText);
      return;
    }
    text = mergeTextFromFrenchScenes(frenchScenes);
    setText(text);
  }, [selectedText, selectedText?.length]);

  function updateLine(line) {
    let type = "";
    if (
      line.kind.match(/business|delivery|entrance|exit|mixed|modifier|location/)
    ) {
      type = "stage_direction";
    } else if (line.kind.match(/flourish|music/)) {
      type = "sound_cue";
    } else {
      type = "line";
    }
    handleLineSubmit(line, type);
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
  async function cutEntireText(lineArray) {
    const types = ["lines", "stage_directions", "sound_cues"];
    types.forEach(function (type) {
      var allTheLines = lineArray[type];
      let updatedLines = allTheLines.map((line) => {
        var newLine = {
          ...line,
          new_content: " ",
        };
        handleLineSubmit(newLine);
        return newLine;
      });
      updateTextInState(type, updatedLines);
    });
  }

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
  async function unCutEntireText(lineArray) {
    const types = ["lines", "stage_directions", "sound_cues"];
    types.forEach(function (type) {
      var allTheLines = lineArray[type];
      let updatedLines = allTheLines.map((line) => {
        var newLine = {
          ...line,
          new_content: "",
        };
        handleLineSubmit(newLine);
        return newLine;
      });
      updateTextInState(type, updatedLines);
    });
  }
  async function updateTextInState(type, lineArray) {
    let newLines = { ...text };
    newLines[type] = lineArray;
    setText(newLines);
  }
  return (
    <EditScriptStyles>
      <h2>{playSkeleton.title}</h2>

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
          characters={characters}
          cutEntireText={cutEntireText}
          handleLineSubmit={updateLine}
          linesPerMinute={linesPerMinute}
          selectedText={selectedText}
          text={text}
          unCutEntireText={unCutEntireText}
        />
      </EditAreaStyles>
    </EditScriptStyles>
  );
}
