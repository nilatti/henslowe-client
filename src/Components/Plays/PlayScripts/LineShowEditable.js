import { useState } from "react";
import uuid from "react-uuid";

import { Button } from "../../Button.js";
import CharacterSelect from "../Characters/CharacterSelect.js";
import LineEditForm from "./LineEditForm.js";
import {
  ButtonContainer,
  CharacterName,
  Line,
  LineNumber,
  LineShowStyles,
} from "./ScriptStyles.js";

import { Diff } from "diff";

export default function LineShowEditable({
  handleLineSubmit,
  index,
  line,
  showCharacter,
  showCut,
}) {
  let tempSelectedCharacter = line.character
    ? [{ key: line.character?.id, name: line.character?.name }]
    : [];
  const [characterSelectOpen, setCharacterSelectOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(
    tempSelectedCharacter
  );

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

  function handleCutWholeLine() {
    let newLine = {
      ...line,
      new_content: " ",
    };
    handleLineSubmit(newLine);
  }

  function handleUnCutWholeLine() {
    let newLine = {
      ...line,
      new_content: "",
    };
    handleLineSubmit(newLine);
  }

  function submitCharacterEdit(newCharacter) {
    setCharacterSelectOpen(!characterSelectOpen);
    let newLine = {
      ...line,
      character_id: newCharacter[0]?.id || null,
      character: {
        id: newCharacter[0]?.id || null,
        name: newCharacter[0]?.name || null,
      },
    };
    handleLineSubmit(newLine);
  }

  function submitLineEdit(line) {
    setEditFormOpen(!editFormOpen);
    handleLineSubmit(line);
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
  if (characterSelectOpen) {
    characterComponent = (
      <CharacterSelect
        onBlur={submitCharacterEdit}
        selectedCharacter={selectedCharacter}
      />
    );
  } else if (showCharacter) {
    characterComponent = (
      <div onDoubleClick={() => setCharacterSelectOpen(!characterSelectOpen)}>
        {line.character.name || line.character.xml_id}
      </div>
    );
  } else {
    characterComponent = (
      <span
        onDoubleClick={() => setCharacterSelectOpen(!characterSelectOpen)}
        className="no-character"
      >
        Set character
      </span>
    );
  }

  return (
    <LineShowStyles index={index}>
      <LineNumber>{line.number}</LineNumber>
      <CharacterName>{characterComponent}</CharacterName>

      {editFormOpen ? (
        <div>
          <LineEditForm line={line} onSubmit={submitLineEdit} />
        </div>
      ) : (
        <Line
          id={line.number}
          className={line.number?.match(/^SD/) ? "stage-direction" : ""}
        >
          <span onDoubleClick={() => setEditFormOpen(!editFormOpen)}>
            {lineText}
          </span>
        </Line>
      )}

      <ButtonContainer>
        {line.new_content != " " ? (
          <Button
            className="toggle-cut"
            variant="info"
            size="sm"
            onClick={() => handleCutWholeLine()}
          >
            Cut Whole Line
          </Button>
        ) : (
          <Button
            colorProp="var(--color-dark)"
            backgroundColor="var(--color-text-light)"
            borderColor="var(--color-dark)"
            className="toggle-cut"
            size="sm"
            variant="outline-info"
            onClick={() => handleUnCutWholeLine()}
          >
            Un-Cut Whole Line
          </Button>
        )}
      </ButtonContainer>
    </LineShowStyles>
  );
}

//tktkt some provision for character groups
