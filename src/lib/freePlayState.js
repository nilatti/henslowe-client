import { createContext, useContext, useEffect, useState } from "react";
import { getPlaySkeleton, getPlayScript } from "../api/plays.js";
import {
  determineTypeOfLine,
  mergeTextFromFrenchScenes,
} from "../utils/playScriptUtils.js";
import _ from "lodash";
const PlayStateContext = createContext();
const PlayStateProvider = PlayStateContext.Provider;

function PlayProvider({ children }) {
  const [castings, setCastings] = useState(
    JSON.parse(sessionStorage.getItem("castings")) || []
  );
  const [fakeActors, setFakeActors] = useState(
    JSON.parse(sessionStorage.getItem("fake_actors")) || {
      female: 0,
      male: 0,
      nonbinary: 0,
    }
  );
  const [fakeActorsArray, setFakeActorsArray] = useState(
    JSON.parse(sessionStorage.getItem("actors_array")) || []
  );
  const [play, setPlay] = useState(
    JSON.parse(sessionStorage.getItem("play")) || {}
  );
  const [playSkeleton, setPlaySkeleton] = useState(
    JSON.parse(sessionStorage.getItem("play_skeleton")) || {}
  );
  const [loading, setLoading] = useState(false);
  const [acts, setActs] = useState([]);
  const [charactersAll, setCharactersAll] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [characterGroups, setCharacterGroups] = useState([]);
  const [frenchScenes, setFrenchScenes] = useState([]);
  const [lines, setLines] = useState([]);
  const [onStages, setOnStages] = useState([]);
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("fake_actors", JSON.stringify(fakeActors));
    let genders = ["female", "male", "nonbinary"];
    let actorsList = {};
    genders.forEach((gender) => {
      actorsList[gender] = [];
    });
    let id = 0;
    if (!fakeActorsArray.length) {
      genders.forEach((gender) => {
        for (let i = 0; i < fakeActors[gender]; i++) {
          id++;
          actorsList[gender].push(buildFakeActor(id, gender, i));
        }
      });

      let actorsArray = actorsList.female
        .concat(actorsList.male)
        .concat(actorsList.nonbinary);
      sessionStorage.setItem("actors_array", JSON.stringify(actorsArray));
      setFakeActorsArray(actorsArray);
    } else {
      let tempActorsList = { female: [], male: [], nonbinary: [] };
      fakeActorsArray.forEach((actor) => {
        //break down fakeActorsArray into an object again, with male, female, and nb
        tempActorsList[actor.first_name.toLowerCase()].push(actor);
      });
      //find where this object differs from fakeActors
      genders.forEach((gender) => {
        if (tempActorsList[gender].length < fakeActors[gender]) {
          //the new number of actors of that gender is less than the old number.
          let id = fakeActorsArray[fakeActorsArray.length - 1].id++;
          let i =
            parseInt(
              tempActorsList[gender][tempActorsList[gender].length - 1]
                ?.last_name
            ) || 1;
          tempActorsList[gender].push(buildFakeActor(id, gender, i));
        } else if (tempActorsList[gender].length > fakeActors[gender]) {
          //the new number of actors of that gender is greater than the old number.
          //remove last ones from each object until number is correct
          let diff = tempActorsList[gender].length - fakeActors[gender];
          let removedActors = tempActorsList[gender].slice(
            Math.max(tempActorsList[gender].length - diff, 0)
          );
          tempActorsList[gender].length = fakeActors[gender];
          removedActors.forEach((actor) => {
            castings.map((c) => {
              if (c.user) {
                if (c.user.id == actor.id) {
                  delete c.user;
                }
              }
            });
          });
          sessionStorage.setItem("castings", JSON.stringify(castings));
          setCastings(castings);
        }
      });
      //rebuild fakeActorsArray
      let tempFakeActorsArray = tempActorsList.female
        .concat(tempActorsList.male)
        .concat(tempActorsList.nonbinary);
      sessionStorage.setItem(
        "actors_array",
        JSON.stringify(tempFakeActorsArray)
      );
      setFakeActorsArray(tempFakeActorsArray);
    }
  }, [JSON.stringify(fakeActors)]);

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
  }, [play.acts, play.characters, play.character_groups]);

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

  function buildCastings(characters) {
    return characters.map((character) => {
      return { character_id: character.id, character: character };
    });
  }

  function buildFakeActor(id, gender, i) {
    return {
      id: id,
      first_name: gender.toUpperCase(),
      jobs: [],
      last_name: `${i + 1}`,
    };
  }
  function updateActorJobs(actor, job) {
    let newActor = actor;
    newActor.jobs = actor.jobs.concat(job);
    let newFakeActorsArray = [...fakeActorsArray];
    newFakeActorsArray = newFakeActorsArray.map((oldActor) => {
      if (oldActor.id == actor.id) {
        return newActor;
      } else {
        return oldActor;
      }
    });
    sessionStorage.setItem("actors_array", JSON.stringify(newFakeActorsArray));
    setFakeActorsArray(newFakeActorsArray);
  }
  function updateCastings(casting, actor) {
    let oldCastings = [...castings];
    let updatedCastings = oldCastings.map((oldCasting) => {
      if (oldCasting.character.id != casting.character.id) {
        return oldCasting;
      } else {
        return { ...oldCasting, user: actor };
      }
    });
    setCastings(updatedCastings);
    sessionStorage.setItem("castings", JSON.stringify(updatedCastings));
  }

  function updateLine(line) {
    let type = determineTypeOfLine(line);
    let newLine = { ...line };
    delete newLine.diffed_content;
    let indicators =
      newLine.number?.match(/(\d+)\.(\d+)/) ||
      newLine.line_number?.match(/(\d+)\.(\d+)/);
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
      return l.id === newLine.id;
    });
    let frenchScene = _.find(scene.french_scenes, function (fs) {
      return fs.id == oldLine.french_scene_id;
    });
    let newFrenchSceneLines = frenchScene[`${type}s`].map((oldLine) => {
      if (oldLine.id != line.id) {
        return oldLine;
      } else {
        return newLine;
      }
    });
    newFrenchSceneLines.map((item) => delete item.diffed_content);
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
    let newPlay = { ...play, acts: newActs, full: true, free: true };
    sessionStorage.setItem("play", JSON.stringify(newPlay));
    setPlay(newPlay);
  }
  //get play
  async function getPlay(playId) {
    sessionStorage.clear();
    if (playId) {
      setLoading(true);
      const response = await getPlayScript(playId);
      if (response.status >= 400) {
        console.log("error getting play");
      } else {
        sessionStorage.setItem("play", JSON.stringify(response.data));
        setPlay({ ...response.data, full: true, free: true });
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
        setPlaySkeleton({ ...skeletonResponse.data, free: true });
      }
      let casting = buildCastings(response.data.characters);
      setCastings(casting);
      sessionStorage.setItem("castings", JSON.stringify(casting));
    }
    setLoading(false);
  }

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

  return (
    <PlayStateProvider
      value={{
        acts,
        castings,
        charactersAll,
        characters,
        characterGroups,
        determineTypeOfLine,
        fakeActors,

        fakeActorsArray,
        frenchScenes,
        getPlay,
        getSelectedText,
        loading,
        play,
        playSkeleton,
        setFakeActors,
        setLoading,
        setPlay,
        updateActorJobs,
        updateCastings,
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
