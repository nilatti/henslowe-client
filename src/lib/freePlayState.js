import { createContext, useContext, useEffect, useState } from "react";
import { getItem } from "../api/crud";
import { getPlaySkeleton, getPlayScript } from "../api/plays";
import { mergeTextFromFrenchScenes } from "../utils/playScriptUtils";
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
  console.log(fakeActorsArray);
  const [play, setPlay] = useState(
    JSON.parse(sessionStorage.getItem("play")) || {}
  );
  const [playSkeleton, setPlaySkeleton] = useState(
    JSON.parse(sessionStorage.getItem("play_skeleton")) || {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("use effect 33");
    sessionStorage.setItem("fake_actors", JSON.stringify(fakeActors));
    let actorsList = { female: [], male: [], nonbinary: [] };
    let id = 0;
    if (!fakeActorsArray.length) {
      for (let i = 0; i < fakeActors.female; i++) {
        id++;
        actorsList.female.push({
          id: id,
          first_name: `Female`,
          jobs: [],
          last_name: `${i + 1}`,
        });
      }
      for (let i = 0; i < fakeActors.male; i++) {
        id++;
        actorsList.male.push({
          id: id,
          first_name: `Male`,
          jobs: [],
          last_name: `${i + 1}`,
        });
      }
      for (let i = 0; i < fakeActors.nonbinary; i++) {
        id++;
        actorsList.nonbinary.push({
          id: id,
          first_name: `Nonbinary`,
          jobs: [],
          last_name: `${i + 1}`,
        });
      }
      let actorsArray = actorsList.female
        .concat(actorsList.male)
        .concat(actorsList.nonbinary);
      sessionStorage.setItem("actors_array", JSON.stringify(actorsArray));
      setFakeActorsArray(actorsArray);
    }
  }, [fakeActors]);

  function buildCastings(characters) {
    return characters.map((character) => {
      return { character_id: character.id, character: character };
    });
  }

  function updateActorJobs(actor, job) {
    console.log("called update actor jobs");
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
    console.log(newFakeActorsArray);
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
      let casting = buildCastings(response.data.characters);
      setCastings(casting);
      sessionStorage.setItem("castings", JSON.stringify(casting));

      setLoading(false);
    }
  }

  return (
    <PlayStateProvider
      value={{
        castings,
        fakeActors,
        fakeActorsArray,
        getPlay,
        loading,
        play,
        playSkeleton,
        setFakeActors,
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
