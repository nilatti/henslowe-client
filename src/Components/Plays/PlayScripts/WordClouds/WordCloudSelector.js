import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../Button.js";
import {
  FancyCheckBox,
  FancyCheckBoxLabel,
  FancyRadio,
} from "../../../Styled.js";
import {
  getFrenchScenesFromPlay,
  getScenesFromPlay,
} from "../../../../utils/playScriptUtils.js";

const SelectGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const SelectItem = styled.div`
  margin: 5px;
`;

const SelectorStyles = styled.div``;

export default function WordCloudSelector({ play, onFormSubmit }) {
  const [selectedCharacters, setSelectedCharacters] = useState(
    play.characters || []
  );

  const [selectedPlayContent, setSelectedPlayContent] = useState([]);

  useEffect(() => {
    if (play.full) {
      setSelectedPlayContent(formatPlayContent(play));
    }
  }, [play]);

  function formatPlayContent(play) {
    let playContent = [];

    let acts = play.acts;
    let frenchScenes = getFrenchScenesFromPlay(play);
    let scenes = getScenesFromPlay(play);
    playContent.push({
      type: "play",
      id: play.id,
      isSelected: false,
      label: `Whole Play`,
    });
    acts.forEach((act) =>
      playContent.push({
        type: "act",
        id: act.id,
        isSelected: false,
        label: `Act ${act.number}`,
      })
    );
    scenes.forEach((scene) =>
      playContent.push({
        type: "scene",
        id: scene.id,
        isSelected: false,
        label: scene.pretty_name,
      })
    );
    frenchScenes.forEach((frenchScene) =>
      playContent.push({
        type: "french_scene",
        id: frenchScene.id,
        isSelected: false,
        label: frenchScene.pretty_name,
      })
    );
    return playContent;
  }
  function submitSelection() {
    let selectedContent = selectedPlayContent.filter((item) => item.isSelected);
    let selectedCharactersArray = selectedCharacters.filter(
      (item) => item.isSelected
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onFormSubmit(selectedContent, selectedCharactersArray);
  }

  function updateCheckedCharacter(e) {
    const targetId = Number(e.target.id);
    setSelectedCharacters(
      selectedCharacters.map((item) =>
        item.id === targetId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  }

  function updateCheckedPlayContent(e) {
    const targetId = e.target.id;
    setSelectedPlayContent(
      selectedPlayContent.map((item) =>
        `${item.type}-${item.id}` === targetId
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  }

  let playUnitColors = {
    act: "var(--color-dark)",
    scene: "var(--color-med)",
    french_scene: "var(--color-light-disabled)",
  };
  let characters = selectedCharacters?.map((item) => {
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

  let playContentSelector = selectedPlayContent?.map((item) => {
    return (
      <SelectItem key={`${item.type}-${item.id}`}>
        <FancyCheckBox backgroundColor={playUnitColors[item.type]}>
          <FancyRadio
            backgroundColor={playUnitColors[item.type]}
            checked={item.isSelected || ""}
            data-checked={item.isSelected}
            id={`${item.type}-${item.id}`}
            onChange={updateCheckedPlayContent}
            type="checkbox"
            value={item.id}
          />
          <FancyCheckBoxLabel>{item.label}</FancyCheckBoxLabel>
        </FancyCheckBox>
      </SelectItem>
    );
  });

  let readyToSubmit =
    selectedCharacters.filter((item) => item.isSelected).length > 0 ||
    selectedPlayContent.filter((item) => item.isSelected).length > 0;

  return (
    <SelectorStyles>
      <h3>Select Characters (optional)</h3>
      <SelectGroup>{characters}</SelectGroup>
      <h3>Select Content (optional)</h3>
      <SelectGroup>{playContentSelector}</SelectGroup>
      <Button disabled={!readyToSubmit} onClick={submitSelection}>
        {readyToSubmit
          ? "Generate Word Clouds"
          : "Please select at least one character or one piece of the play."}
      </Button>
    </SelectorStyles>
  );
}
