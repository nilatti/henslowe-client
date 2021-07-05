import { createContext, useContext, useEffect, useState } from "react";
import { getItem } from "../api/crud";
import { getPlaySkeleton, getPlayScript } from "../api/plays";
import { mergeTextFromFrenchScenes } from "../utils/playScriptUtils";
import _ from "lodash";
const PlayStateContext = createContext();
const PlayStateProvider = PlayStateContext.Provider;

function PlayProvider({ children }) {
  const [play, setPlay] = useState(
    JSON.parse(sessionStorage.getItem("play")) || {}
  );
  const [playSkeleton, setPlaySkeleton] = useState(
    JSON.parse(sessionStorage.getItem("play_skeleton")) || {}
  );
  const [loading, setLoading] = useState(false);

  function updateLine(line, type) {
    let indicators = line.number.match(/(\d+)\.(\d+)/);
    let actNumber = indicators[1];
    let sceneNumber = indicators[2];

    let act = _.find(play.acts, function (a) {
      return a.number == actNumber;
    });
    let scene = _.find(act.scenes, function (s) {
      return s.number == sceneNumber;
    });
    let lines = mergeTextFromFrenchScenes(scene.french_scenes);
    let oldLine = _.find(lines[`${type}s`], function (l) {
      return l.id === line.id;
    });
    let frenchScene = _.find(scene.french_scenes, function (fs) {
      return fs.id == oldLine.french_scene_id;
    });
    let newFrenchSceneLines = frenchScene[`${type}s`].map((oldLine) => {
      if (oldLine.id != line.id) {
        return oldLine;
      } else {
        return line;
      }
    });
    let newFrenchScene = { ...frenchScene, [`${type}s`]: newFrenchSceneLines };
    let newSceneFrenchScenes = scene.french_scenes.map((oldFrenchScene) => {
      if (oldFrenchScene.id != frenchScene.id) {
        return oldFrenchScene;
      } else {
        return newFrenchScene;
      }
    });
    let newScene = { ...scene, french_scenes: newSceneFrenchScenes };

    let newActScenes = act.scenes.map((oldScene) => {
      if (oldScene.id != scene.id) {
        return oldScene;
      } else {
        return newScene;
      }
    });
    let newAct = { ...act, scenes: newActScenes };
    let newActs = play.acts.map((oldAct) => {
      if (oldAct.id != act.id) {
        return oldAct;
      } else {
        return newAct;
      }
    });
    let newPlay = { ...play, acts: newActs };
    setPlay(newPlay);
  }
  //get play
  async function getPlay(playId) {
    if (playId) {
      setLoading(true);
      const response = await getPlayScript(playId);
      if (response.status >= 400) {
        console.log("error getting play");
      } else {
        sessionStorage.setItem("play", JSON.stringify(response.data));
        setPlay(response.data);
      }
      let skeletonResponse = await getPlaySkeleton(playId);
      if (skeletonResponse.status >= 400) {
        console.log("error!");
        setErrors((errors) => [...errors, "Error fetching play skeleton"]);
      } else {
        sessionStorage.setItem(
          "play_skeleton",
          JSON.stringify(skeletonResponse.data)
        );
        setPlaySkeleton(skeletonResponse.data);
      }
      setLoading(false);
    }
  }

  return (
    <PlayStateProvider
      value={{
        getPlay,
        loading,
        play,
        playSkeleton,
        setPlay,
        updateLine,
      }}
    >
      {children}
    </PlayStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function usePlayState() {
  // We use a consumer here to access the local state
  const all = useContext(PlayStateContext);
  return all;
}
export { PlayProvider, usePlayState };
