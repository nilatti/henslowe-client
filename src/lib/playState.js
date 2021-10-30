import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { createItem, deleteItem, getItem, updateServerItem } from "../api/crud";
import { getPlayScript, getPlaySkeleton } from "../api/plays";
import { determineTypeOfLine } from "../utils/playScriptUtils";
const PlayStateContext = createContext();
const PlayStateProvider = PlayStateContext.Provider;
function PlayProvider({ children }) {
  const { playId } = useParams();
  const [loading, setLoading] = useState(false);
  const [acts, setActs] = useState([]);
  const [charactersAll, setCharactersAll] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [characterGroups, setCharacterGroups] = useState([]);
  const [frenchScenes, setFrenchScenes] = useState([]);
  const [lines, setLines] = useState([]);
  const [onStages, setOnStages] = useState([]);
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
    if (play.characters) {
      setCharacters(play.characters);
    }
    if (play.character_groups) {
      setCharacterGroups(play.character_groups);
    }
    if (play.characters && play.character_groups) {
      let flaggedCharacters = play.characters.map((c) => {
        return { ...c, type: "character" };
      });
      let flaggedCharacterGroups = play.character_groups.map((c) => {
        return { ...c, type: "character_group" };
      });
      setCharactersAll(flaggedCharacters.concat(flaggedCharacterGroups));
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

    let allOnStages = [];
    frenchScenes.map(
      (frenchScene) => (allOnStages = allOnStages.concat(frenchScene.on_stages))
    );
    setOnStages(allOnStages);
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

  function updateLocalAct(newAct) {
    let updatedPlay = { ...play };
    updatedPlay.acts = updatedPlay.acts.map((a) =>
      a.id === newAct.id ? newAct : a
    );
    setPlay(updatedPlay);
  }

  function updateLocalFrenchScene(newFrenchScene) {
    let updatedScene = scenes.find((s) => s.id === newFrenchScene.scene_id);
    updatedScene.french_scenes = updatedScene.french_scenes.map((fs) =>
      fs.id === newFrenchScene.id ? newFrenchScene : fs
    );
    updateLocalScene(updatedScene);
  }

  function updateLocalLine(newLine) {
    let workingLines = lines.map((l) =>
      l.id === newLine.id ? { ...l, newLine } : l
    );
    setLines(workingLines);
    let workingFrenchScene = frenchScenes.find(
      (frenchScene) => frenchScene.id == newLine.french_scene_id
    );
    let updatedFrenchScene = { ...workingFrenchScene };
    updatedFrenchScene.lines = updatedFrenchScene.lines.map((oldLine) =>
      oldLine.id === newLine.id ? { ...oldLine, newLine } : oldLine
    );
    updateLocalFrenchScene(updatedFrenchScene);
  }

  function updateLocalOnStage(newOnStage) {
    let workingOnStages = onStages.map((os) =>
      os.id === newOnStage.id ? { ...os, newOnStage } : os
    );
    setOnStages(workingOnStages);
    let workingFrenchScene = frenchScenes.find(
      (frenchScene) => frenchScene.id == newOnStage.french_scene_id
    );
    let updatedFrenchScene = { ...workingFrenchScene };
    updatedFrenchScene.on_stages = updatedFrenchScene.on_stages.map((os) =>
      os.id === newOnStage.id ? { ...os, newOnStage } : os
    );
    updateLocalFrenchScene(updatedFrenchScene);
  }

  function updateLocalScene(newScene) {
    let updatedAct = acts.find((a) => a.id === newScene.act_id);
    updatedAct.scenes = updatedAct.scenes.map((s) =>
      s.id === newScene.id ? newScene : s
    );
    updateLocalAct(updatedAct);
  }

  async function addNewCharacter(character) {
    let response = await createItem(character, character.type);
    if (response.status >= 400) {
      console.log("error creating character");
    } else {
      let workingPlay = { ...play };
      workingPlay[`${character.type}s`] = [
        ...workingPlay[`${character.type}s`],
        response.data,
      ];
      setPlay(workingPlay);
    }
    return response.data.id;
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

  async function deleteOnStage(onStage) {
    let response = await deleteItem(onStage.id, "on_stage");
    if (response.status >= 400) {
      console.log("error deleting onstage");
    } else {
      let updatedOnStages = onStages.filter((os) => os.id != onStage.id);
      setOnStages(updatedOnStages);
      let workingFrenchScene = frenchScenes.find(
        (fs) => fs.id === onStage.french_scene_id
      );
      let workingOnStages = workingFrenchScene.on_stages.filter(
        (os) => os.id != onStage.id
      );
      let updatedFrenchScene = {
        ...workingFrenchScene,
        on_stages: workingOnStages,
      };
      updateLocalFrenchScene(updatedFrenchScene);
    }
  }

  async function handleLineSubmit(line, type) {
    line.character_id = line.character_id || line.character?.id;
    delete line.diffed_content;
    const response = await updateServerItem(line, type);
    if (response.status >= 400) {
      setError(`Error updating ${type}`);
    } else {
      updateLocalLine(response.data);
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
      setLoading(false);
    }
  }

  async function loadPlay() {
    if (!play.full && !play.medium) {
      setLoading(true);
      const response = await getItem(playId, "play");
      if (response.status >= 400) {
        console.log("error fetching play");
      } else {
        setPlay({ ...response.data, medium: true });
      }
      setLoading(false);
    } else if (play.full) {
      setPlay({ ...play, medium: true });
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

  async function updateCharacter(character) {
    let response = await updateServerItem(character, character.type);
    if (response.status >= 400) {
      console.log("error updating character");
    } else {
      let characterArray = play[`${character.type}s`];
      let updatedCharacters = characterArray.map((c) =>
        c.id === character.id ? { ...c, character } : c
      );
      let workingPlay = { ...play, [character.type]: updatedCharacters };
      setPlay(workingPlay);
      if (character.type === "character") {
        let workingCharacters = characters.map((c) =>
          c.id === character.id ? { ...c, character } : c
        );
        setCharacters(workingCharacters);
      } else {
        let workingCharacterGroups = characterGroups.map((c) =>
          c.id === character.id ? { ...c, character } : c
        );
        setCharacterGroups(workingCharacterGroups);
      }
      setCharactersAll(characters.concat(characterGroups));
    }
  }

  async function updatePlayTextItem(item, type) {
    const response = await updateServerItem(item, type);
    if (response.status >= 400) {
      console.log("error updating item");
    } else {
      let updatedPlay = { ...play };
      let data = response.data;
      if (type == "act") {
        updateLocalAct(data);
      } else if (type == "scene") {
        updateLocalScene(data);
      } else if (type == "french_scene") {
        updateLocalFrenchScene(data);
      }
      setPlay(updatedPlay);
    }
  }

  async function updateOnStage(onStage) {
    const response = await updateServerItem(onStage, "on_stage");
    if (response.status >= 400) {
      console.log("error updating item");
    } else {
      updateLocalOnStage(response.data);
    }
  }
  return (
    <PlayStateProvider
      value={{
        acts,
        addNewCharacter,
        charactersAll,
        characters,
        characterGroups,
        cutEntireText,
        deleteOnStage,
        frenchScenes,
        getSelectedText,
        loadFullPlay,
        loading,
        loadPlay,
        updateOnStage,
        play,
        scenes,
        unCutEntireText,
        updateCharacter,
        updateLine,
        updatePlayTextItem,
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
