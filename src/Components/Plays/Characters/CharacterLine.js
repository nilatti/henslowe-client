import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { Diff } from "diff";
import { LineShowStylesNonEdit } from "../PlayScripts/ScriptStyles.js";

export default function CharacterLine({ line, showCut }) {
  const [formattedLine, setFormattedLine] = useState(line);

  useEffect(() => {
    let workingLine = line;
    if (workingLine.new_content) {
      workingLine.diffed_content = buildLineContentWithDiffs(
        Diff.diffWordsWithSpace(
          workingLine.original_content,
          workingLine.new_content
        )
      );
    }
    workingLine.lineText = workingLine.original_content;
    if (workingLine.diffed_content && showCut) {
      workingLine.lineText = workingLine.diffed_content;
    } else if (workingLine.new_content) {
      workingLine.lineText = workingLine.new_content;
    } else {
      workingLine.lineText = workingLine.original_content;
    }
    setFormattedLine(workingLine);
  }, [JSON.stringify(line), showCut]);

  function buildLineContentWithDiffs(diffArray) {
    let diffArrayWithClasses = diffArray.map((item) => {
      if (item.removed === true) {
        return (
          <span className="cut" key={uuid()}>
            {item.value}
          </span>
        );
      } else if (item.added === true) {
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
  if (formattedLine.number && formattedLine.number.match(/^SD/)) {
    return (
      <LineShowStylesNonEdit>
        <div>{formatted.number}</div>
        <div>
          <div id={formatted.number} className="stage-direction">
            <div id={formatted.number} className="line">
              {formattedLine.lineText}
            </div>
          </div>
        </div>
      </LineShowStylesNonEdit>
    );
  }
  return (
    <LineShowStylesNonEdit targetCharacter={true}>
      <div>{formattedLine.number}</div>
      <div></div>
      <div>
        <div id={formattedLine.number} className="line">
          {formattedLine.lineText}
        </div>
      </div>
    </LineShowStylesNonEdit>
  );
}
