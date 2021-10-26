import { useState } from "react";
import styled from "styled-components";
import ScriptContainer from "./ScriptContainer";
import { Button } from "../../Button";
import { calculateRunTime } from "../../../utils/playScriptUtils";
const TextEditStyles = styled.div`
  border-left: 1px solid var(--color-light);
  flex: 3 0 70%;
  padding-left: 35px;
`;
export default function TextEdit({
  handleLineSubmit,
  linesPerMinute,
  selectedText,
  text,
}) {
  const [showCut, setShowCut] = useState(true);
  if (!selectedText || !selectedText.id)
    return (
      <TextEditStyles>
        To begin, use the menu on the left to select the text you would like to
        work with
      </TextEditStyles>
    );

  return (
    <TextEditStyles>
      <h3>{selectedText.heading || selectedText.pretty_name}</h3>
      <div>
        {linesPerMinute > 0 && text.lines && text.lines.length > 0 && (
          <strong>
            Run time at {linesPerMinute} lines per minute:
            {calculateRunTime(text.lines, linesPerMinute)} minutes
          </strong>
        )}
      </div>
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
      {/* <Button onClick={() => cutEntireText(text)}>Cut all of this</Button>
      <Button
        colorProp="var(--color-dark)"
        backgroundColor="var(--color-text-light)"
        borderColor="var(--color-dark)"
        onClick={() => unCutEntireText(text)}
      >
        Uncut all of this
      </Button> */}
      <ScriptContainer
        handleLineSubmit={handleLineSubmit}
        showCut={showCut}
        text={text}
      />
    </TextEditStyles>
  );
}
