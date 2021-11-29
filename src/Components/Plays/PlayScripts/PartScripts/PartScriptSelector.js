import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../../Button";
import { buildUserName } from "../../../../utils/actorUtils";
import { FancyCheckBox, FancyCheckBoxLabel, FancyRadio } from "../../../Styled";
import { Link } from "react-router-dom";

const SelectGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const SelectItem = styled.div`
  margin: 5px;
`;
export default function PartScriptSelector({
  actors,
  characters,
  onFormSubmit,
  play,
}) {
  const [selectedCharacters, setSelectedCharacters] = useState(characters);

  const [selectedActors, setSelectedActors] = useState(actors);

  function submitSelection() {
    let selectedActorsArray = selectedActors.filter((item) => item.isSelected);
    let selectedCharactersArray = selectedCharacters.filter(
      (item) => item.isSelected
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onFormSubmit(selectedActorsArray, selectedCharactersArray);
  }

  function updateCheckedCharacter(e) {
    const targetId = Number(e.target.id);
    setSelectedCharacters(
      selectedCharacters.map((item) =>
        item.id === targetId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  }

  function updateCheckedActor(e) {
    const targetId = e.target.id;
    setSelectedActors(
      selectedActors.map((item) =>
        `${item.id}` === targetId
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  }

  let charactersSelector = selectedCharacters?.map((item) => {
    return (
      <SelectItem key={item.id}>
        <FancyCheckBox htmlFor={item.id}>
          <FancyRadio
            type="checkbox"
            id={`${item.id}`}
            data-checked={item.isSelected}
            checked={item.isSelected || ""}
            onChange={updateCheckedCharacter}
            value={item.id}
          />
          <FancyCheckBoxLabel>{item.name}</FancyCheckBoxLabel>
        </FancyCheckBox>
      </SelectItem>
    );
  });

  let actorsSelector = selectedActors?.map((item) => {
    return (
      <SelectItem key={`${item.id}`}>
        <FancyCheckBox>
          <FancyRadio
            type="checkbox"
            id={`${item.id}`}
            data-checked={item.isSelected}
            checked={item.isSelected || ""}
            onChange={updateCheckedActor}
            value={item.id}
          />
          <FancyCheckBoxLabel>{buildUserName(item)}</FancyCheckBoxLabel>
        </FancyCheckBox>
      </SelectItem>
    );
  });

  return (
    <>
      <h3>Select Characters (optional)</h3>
      <SelectGroup>{charactersSelector}</SelectGroup>
      {(!!actorsSelector.length || play.free) && (
        <h3>Select Actors (optional)</h3>
      )}

      {!!actorsSelector.length && <SelectGroup>{actorsSelector}</SelectGroup>}
      {!actorsSelector.length && play.free && (
        <div>
          You don't have any actors cast. Go to cast some people and then come
          back here.
        </div>
      )}
      <Button onClick={submitSelection}>Generate Part Scripts</Button>
    </>
  );
}
