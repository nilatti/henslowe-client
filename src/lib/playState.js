import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { updateServerItem } from "../api/crud";
import { getPlayScript, getPlaySkeleton } from "../api/plays";
import { determineTypeOfLine } from "../utils/playScriptUtils";
const PlayStateContext = createContext();
const PlayStateProvider = PlayStateContext.Provider;
function PlayProvider({ children }) {
  const { playId } = useParams();
  const [loading, setLoading] = useState(false);
  const [acts, setActs] = useState([]);
  const [frenchScenes, setFrenchScenes] = useState([]);
  const [lines, setLines] = useState([]);
  const [play, setPlay] = useState([]);
  const [scenes, setScenes] = useState([]);

  useEffect(async () => {
    if (!play.title) {
      setLoading(true);
      const response = await getPlaySkeleton(playId);
      if (response.status >= 400) {
        console.log("error fetching play");
      } else {
        setPlay(response.data);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (play.acts) {
      setActs(play.acts);
    }
  }, [play]);

  useEffect(() => {
    if (acts.length) {
      let allScenes = [];
      play.acts.map((act) => (allScenes = allScenes.concat(act.scenes)));
      setScenes(allScenes);
    }
  }, [acts]);

  useEffect(() => {
    if (scenes.length) {
      let allFrenchScenes = [];
      scenes.map(
        (scene) =>
          (allFrenchScenes = allFrenchScenes.concat(scene.french_scenes))
      );
      setFrenchScenes(allFrenchScenes);
    }
  }, [scenes]);

  useEffect(() => {
    let allLines = [];
    frenchScenes.map(
      (frenchScene) => (allLines = allLines.concat(frenchScene.lines))
    );
    setLines(allLines);
  }, [frenchScenes]);

  function getSelectedText(textMenuKey, textUnit) {
    let response = {};
    if (textUnit === "play") {
      response = play;
    } else if (textUnit === "act") {
      response = acts.find((act) => act.id == textMenuKey);
    } else if (textUnit === "scene") {
      let textUnitId = textMenuKey.match(/\/(\d+)/)[1];
      response = scenes.find((scene) => scene.id == textUnitId);
    } else if (textUnit === "frenchScene") {
      let textUnitId = textMenuKey.match(/\/(\d+)/g)[1];
      textUnitId = textUnitId.replace("/", "");
      response = frenchScenes.find(
        (frenchScene) => frenchScene.id == textUnitId
      );
    }
    return { ...response, textUnit };
  }

  function locateLineInPlay(line) {
    let location = {};
    let lineLocation = lines.find((l) => l.id == line.id);
    location.frenchSceneId = lineLocation.french_scene_id;
    let frenchSceneLocation = frenchScenes.find(
      (fs) => fs.id === location.frenchSceneId
    );
    location.sceneId = frenchSceneLocation.scene_id;
    let sceneLocation = scenes.find((s) => s.id === location.sceneId);
    location.actId = sceneLocation.act_id;
    return location;
  }

  function updateLine(line) {
    let type = determineTypeOfLine(line);
    handleLineSubmit(line, type);
  }

  async function cutEntireText(lineArray) {
    const types = ["lines", "stage_directions", "sound_cues"];
    types.forEach(function (type) {
      let singularType = type.slice(0, -1); // handleLineSubmit expects a singular type
      var allTheLines = lineArray[type];
      let updatedLines = allTheLines.map((line) => {
        var newLine = {
          ...line,
          new_content: " ",
        };
        delete newLine.diffed_content;
        handleLineSubmit(newLine, singularType);
        return newLine;
      });
      updateTextInState(type, updatedLines);
    });
  }

  async function handleLineSubmit(line, type) {
    line.character_id = line.character_id || line.character?.id;
    delete line.diffed_content;
    console.log(line);
    const response = await updateServerItem(line, type);
    if (response.status >= 400) {
      setError(`Error updating ${type}`);
    } else {
      let lineLocation = locateLineInPlay(line);
      let workingAct = play.acts.find((act) => act.id == lineLocation.actId);
      let workingScene = workingAct.scenes.find(
        (scene) => scene.id == lineLocation.sceneId
      );
      let workingFrenchScene = workingScene.french_scenes.find(
        (frenchScene) => frenchScene.id == lineLocation.frenchSceneId
      );
      let updatedFrenchScene = { ...workingFrenchScene };
      updatedFrenchScene.lines = updatedFrenchScene.lines.map((oldLine) =>
        oldLine.id === line.id ? line : oldLine
      );
      let updatedScene = { ...workingScene };
      updatedScene.french_scenes = updatedScene.french_scenes.map((fs) =>
        fs.id === updatedFrenchScene.id ? updatedFrenchScene : fs
      );
      let updatedAct = { ...workingAct };
      updatedAct.scenes = updatedAct.scenes.map((s) =>
        s.id === updatedScene.id ? updatedScene : s
      );

      let updatedPlay = { ...play };
      updatedPlay.acts = updatedPlay.acts.map((a) =>
        a.id === updatedAct.id ? updatedAct : a
      );
      setPlay(updatedPlay);
    }
  }

  async function loadFullPlay() {
    if (!lines.length) {
      setLoading(true);
      const response = await getPlayScript(playId);
      if (response.status >= 400) {
        console.log("error fetching play");
      } else {
        setPlay({ ...response.data, full: true });
      }
      console.log(play);
      setLoading(false);
    }
  }

  async function unCutEntireText(lineArray) {
    const types = ["lines", "stage_directions", "sound_cues"];
    types.forEach(function (type) {
      var allTheLines = lineArray[type];
      let relevantLines = allTheLines.filter((line) => !line.new_content);
      let singularType = type.slice(0, -1); // handleLineSubmit expects a singular type
      let updatedLines = relevantLines.map((line) => {
        var newLine = {
          ...line,
          new_content: null,
        };
        handleLineSubmit(newLine, singularType);
        return newLine;
      });
      updateTextInState(type, updatedLines);
    });
  }
  return (
    <PlayStateProvider
      value={{
        acts,
        cutEntireText,
        frenchScenes,
        getSelectedText,
        loadFullPlay,
        loading,
        play,
        scenes,
        unCutEntireText,
        updateLine,
      }}
    >
      {children}
    </PlayStateProvider>
  );
}

function usePlayState() {
  // We use a consumer here to access the local state
  const all = useContext(PlayStateContext);
  return all;
}
export { PlayProvider, usePlayState };
