//this is the container for play editing for PAID customers. It talks to the server
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { updateServerItem } from "../../api/crud";
import {
  getActScript,
  getFrenchSceneScript,
  getSceneScript,
  getPlayScript,
  getPlaySkeleton,
} from "../../api/plays";
import Modal from "../Modal";
import { Spinner } from "../Loaders";

import EditScript from "./EditScript";

export default function PlayScripts() {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playSkeleton, setPlaySkeleton] = useState({});
  const [selectedText, setSelectedText] = useState({});
  useEffect(async () => {
    setLoading(true);
    let response = await getPlaySkeleton(id);
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching play"]);
    } else {
      setPlaySkeleton(response.data);
    }
    setLoading(false);
  }, []);
  async function getSelectedText(textMenuKey, textUnit) {
    setLoading(true);
    let response = {};
    if (textUnit === "play") {
      response = await getPlayScript(id);
    } else if (textUnit === "act") {
      response = await getActScript(textMenuKey);
    } else if (textUnit === "scene") {
      let textUnitId = textMenuKey.match(/\/(\d+)/g)[0];
      response = await getSceneScript(textUnitId);
    } else if (textUnit === "frenchScene") {
      let textUnitId = textMenuKey.match(/\/(\d+)/g)[1];
      response = await getFrenchSceneScript(textUnitId);
    }
    setLoading(false);
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching text"]);
    } else {
      let responseDataWithTextUnit = { ...response.data, textUnit };
      setSelectedText(responseDataWithTextUnit);
    }
  }
  async function handleLineSubmit(line, type) {
    line.character_id = line.character_id || line.character?.id;

    delete line.diffed_content;
    delete line.created_at;
    delete line.updated_at;
    delete line.count;
    delete line.words;
    let response;

    response = await updateServerItem(line, type);
    if (response.status >= 400) {
      setError(`Error updating ${type}`);
    } else {
    }
  }
  if (loading) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }
  return (
    <EditScript
      characters={playSkeleton.characters}
      getSelectedText={getSelectedText}
      handleLineSubmit={handleLineSubmit}
      linesPerMinute={playSkeleton.production?.lines_per_minute}
      playSkeleton={playSkeleton}
      selectedText={selectedText}
    />
  );
}
