import _ from "lodash";

import NonEditLineShow from "../NonEditLineShow";
import { Button } from "../../Button";
import { sortLines } from "../../../utils/playScriptUtils";

export default function PartScriptTextContainer({
  characterIds,
  name,
  showCut,
  text,
}) {
  function findClosestUncutText(i, lineIndex, lines) {
    let testLine = lines[lineIndex - i];
    if (!testLine) return;
    let characterId = testLine.character_id;
    if (characterIds.includes(characterId)) {
      return null;
    }
    if (testLine.number.match(/^SD/)) {
      return testLine;
    }
    if (!showCut && testLine.new_content && testLine.new_content == " ") {
      return null;
    }

    if (!showCut && testLine.new_content) {
      let ellidedContent = ellideContent(testLine.new_content);
      return { ...testLine, new_content: ellidedContent };
    }
    if (!testLine.new_content) {
      let ellidedContent = ellideContent(testLine.original_content);
      return { ...testLine, original_content: ellidedContent };
    }
    if (characterId != lines[lineIndex].character_id) {
      return testLine;
    }
    i++;
    if (lineIndex - i < 0) {
      return;
    }
    findClosestUncutText(i, lineIndex, lines);
  }

  function ellideContent(content) {
    let wordArray = content.split(" ");
    let ellipsis = wordArray.length >= 3 ? "..." : "";
    let ellidedContent = `${ellipsis}${wordArray.slice(-3).join(" ")}`;
    return ellidedContent;
  }

  function orderText(text) {
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

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  if (text.lines && text.lines.length > 0) {
    let lines = orderText(text);
    let characterLines = lines.map((line, index) => {
      if (characterIds.includes(line.character_id)) {
        return { ...line, index: index };
      }
    });
    characterLines = _.compact(characterLines);
    let nonCharacterLines = characterLines.map((line) => {
      if (lines[line.index - 1]?.character_id == line.character_id) {
        return;
      }
      let nearLine = findClosestUncutText(1, line.index, lines);
      return nearLine;
    });
    nonCharacterLines = _.compact(nonCharacterLines);
    let culledLines = characterLines.concat(nonCharacterLines);
    lines = sortLines(culledLines);

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
        <NonEditLineShow
          key={index}
          index={index}
          line={line}
          showCharacter={showCharacter}
          showCut={showCut}
          targetCharacter={characterIds.includes(line.character_id)}
        />
      );
    });
    return (
      <>
        <h3>Part Script for {name}</h3>
        <Button onClick={scrollToTop}>Back to top</Button>
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
        <div>{lineItems}</div>
      </>
    );
  }

  return <div>No text selected</div>;
}
