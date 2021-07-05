import _ from "lodash";
import uuid from "react-uuid";

import LineShow from "./LineShow";
import { sortLines } from "../../utils/playScriptUtils";

export default function ScriptContainer({
  characters,
  handleLineSubmit,
  showCut,
  text,
}) {
  function extractNumberFromXmlId(xmlId) {
    let order_number = xmlId.replace(/[^0-9\.]/g, "");
    return parseFloat(order_number);
  }

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
        <LineShow
          key={index}
          index={index}
          line={line}
          characters={characters}
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
