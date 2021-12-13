import _ from "lodash";
import LineShowEditable from "./LineShowEditable";

import { sortLines } from "../../utils/playScriptUtils";

export default function ScriptContainer({ handleLineSubmit, showCut, text }) {
  function orderText() {
    let bucket = text.lines
      .concat(text.stage_directions)
      .concat(text.sound_cues);
    bucket = _.filter(bucket, function (o) {
      return !o.original_content.match(/^$/);
    });
    if (!showCut) {
      bucket = _.filter(bucket, function (o) {
        if (o.new_content) {
          return !o.new_content.match(/^ $/);
        } else {
          return o;
        }
      });
    }
    return sortLines(bucket);
  }
  if (text.lines && text.lines.length > 0) {
    let lines = orderText();
    let currentCharacter = {};
    let showCharacter = "";
    let lineItems = lines.map((line, index) => {
      if (line.character && line.character.id !== currentCharacter.id) {
        currentCharacter = line.character;
        showCharacter = true;
      } else {
        showCharacter = false;
      }

      return (
        <LineShowEditable
          key={index}
          index={index}
          line={line}
          handleLineSubmit={handleLineSubmit}
          showCharacter={showCharacter}
          showCut={showCut}
        />
      );
    });
    return <div>{lineItems}</div>;
  }

  return <div>No text selected</div>;
}
