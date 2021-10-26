import styled from "styled-components";
import uuid from "react-uuid";

var Diff = require("diff");

const CharacterName = styled.div`
  font-weight: bold;
  padding-left: 10px;
`;

const LineNumber = styled.div``;
const LineShowStyles = styled.div`
  align-items: center;
  background: var(--color-background);
  display: grid;
  grid-template-columns: [line-number] 10% [character-name] 25% [line-text] auto [end];
  padding-top: ${(props) => (props.targetCharacter ? "10px" : "50px")};
`;

const Line = styled.div`
  justify-self: start;
`;

export default function NonEditLineShow({
  index,
  line,
  showCharacter,
  showCut,
  targetCharacter,
}) {
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
      <span>{line.character.name || line.character.xml_id}</span>
    );
  } else {
    characterComponent = <span className="no-character"></span>;
  }

  return (
    <LineShowStyles index={index} targetCharacter={targetCharacter}>
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
