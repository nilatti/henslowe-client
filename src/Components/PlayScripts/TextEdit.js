import styled from "styled-components";
import { calculateRunTime } from "../../utils/playScriptUtils";
const TextEditStyles = styled.div`
  border-left: 1px solid var(--color-light);
  padding-left: 35px;
`;
export default function TextEdit({ lines, linesPerMinute, selectedText }) {
  if (!selectedText)
    return (
      <TextEditStyles>
        To begin, use the menu on the left to select the text you would like to
        work with
      </TextEditStyles>
    );
  console.log(selectedText);
  return (
    <TextEditStyles>
      <h3>{selectedText.heading || selectedText.pretty_name}</h3>
      <div>
        {linesPerMinute > 0 && lines.lines && lines.lines.length > 0 && (
          <strong>
            Run time at {linesPerMinute} lines per minute:
            {calculateRunTime(lines.lines, linesPerMinute)} minutes
          </strong>
        )}
        {/* {selectedText.lines &&
        play.production &&
        play.production.lines_per_minute ? (
          <strong>
            Run time at {linesPerMinute} lines per minute:{" "}
            {minutesRunTime} minutes ({hoursRunTime} hours)
          </strong>
        ) : (
          <span></span>
        )} */}
      </div>
    </TextEditStyles>
  );
}
