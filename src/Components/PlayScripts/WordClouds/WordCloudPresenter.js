import { useRef } from "react";
import uuid from "react-uuid";
import ComparisonContainer from "./ComparisonContainer";

import {
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  getLinesForCharacter,
  mergeTextFromFrenchScenes,
  returnWordsFromLines,
} from "../../../utils/playScriptUtils";

export default function WordCloudPresenter({ context, play }) {
  let contextArray = context.map((item) => {
    if (item.type) {
      if (item.type == "play") {
        let frenchScenes = getFrenchScenesFromPlay(play);
        let playLines = mergeTextFromFrenchScenes(frenchScenes);
        return { item, lines: returnWordsFromLines(playLines.lines) };
      } else if (item.type == "act") {
        let act = play.acts.find((act) => act.id == item.id);
        let frenchScenes = getFrenchScenesFromAct(act);
        let actLines = mergeTextFromFrenchScenes(frenchScenes);
        return { item, lines: returnWordsFromLines(actLines.lines) };
      } else if (item.type == "scene") {
        let actNumber = item.label.split(".")[0];
        let act = play.acts.find((playAct) => playAct.number == actNumber);
        let scene = act.scenes.find((scene) => scene.id == item.id);
        let sceneLines = mergeTextFromFrenchScenes(scene.french_scenes);
        return { item, lines: returnWordsFromLines(sceneLines.lines) };
      } else if (item.type == "french_scene") {
        let identifyingNumber = item.label.split(".");
        let actNumber = identifyingNumber[0];
        let sceneNumber = identifyingNumber[1];
        let frenchSceneNumber = identifyingNumber[2];
        let act = play.acts.find((playAct) => playAct.number == actNumber);
        let scene = act.scenes.find((scene) => scene.number == sceneNumber);
        let frenchScene = scene.french_scenes.find(
          (frenchScene) => frenchScene.number == frenchSceneNumber
        );

        return { item, lines: returnWordsFromLines(frenchScene.lines) };
      }
    } else {
      let frenchScenes = getFrenchScenesFromPlay(play);
      let playLines = mergeTextFromFrenchScenes(frenchScenes);
      let characterLines = getLinesForCharacter(playLines.lines, item.id);
      return { item, lines: returnWordsFromLines(characterLines) };
    }
  });

  if (!contextArray.length) {
    return <div>Loading</div>;
  }
  const cloudRef = useRef();
  function scrollToCloud() {
    cloudRef.current.scrollIntoView({ behavior: "smooth" });
  }
  let linkArray = contextArray.map((context) => (
    <li key={context.item.name}>
      <a href={`#${context.item.label || context.item.name}`}>
        {context.item.label || context.item.name}
      </a>
    </li>
  ));
  return (
    <div>
      <ul>{linkArray}</ul>
      {contextArray.map((context) => (
        <ComparisonContainer context={context} key={uuid()} ref={cloudRef} />
      ))}
    </div>
  );
}
