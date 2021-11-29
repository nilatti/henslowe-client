import { useState } from "react";
import uuid from "react-uuid";

import {
  CharacterName,
  Line,
  LineNumber,
  LineShowStyles,
} from "./ScriptStyles";

var Diff = require("diff");

export default function LineShowRead({ index, line, showCharacter, showCut }) {
  function buildLineContentWithDiffs(diffArray) {
    let diffArrayWithClasses = diffArray.map((item) => {
      if (item.removed == true) {
        return (
          <span className="cut" key={uuid()}>
            {item.value}
          </span>
        );
      } else if (item.added == true) {
        return (
          <span className="added" key={uuid()}>
            {item.value}
          </span>
        );
      } else {
        return <span key={uuid()}>{item.value}</span>;
      }
    });
    return diffArrayWithClasses;
  }

  if (line.new_content && line.new_content.length > 0) {
    line.diffed_content = buildLineContentWithDiffs(
      Diff.diffWordsWithSpace(line.original_content, line.new_content)
    );
  } else {
    delete line.diffed_content;
  }
  let lineText;
  if (line.diffed_content && showCut) {
    lineText = line.diffed_content;
  } else if (line.new_content) {
    lineText = line.new_content;
  } else {
    lineText = line.original_content;
  }
  let characterComponent;
  if (showCharacter) {
    characterComponent = (
      <div>{line.character.name || line.character.xml_id}</div>
    );
  } else {
    characterComponent = <span className="no-character"></span>;
  }

  return (
    <LineShowStyles index={index}>
      <LineNumber>{line.number}</LineNumber>
      <CharacterName>{characterComponent}</CharacterName>
      <Line
        id={line.number}
        className={line.number?.match(/^SD/) ? "stage-direction" : ""}
      >
        <span>{lineText}</span>
      </Line>
    </LineShowStyles>
  );
}

//tktkt some provision for character groups
