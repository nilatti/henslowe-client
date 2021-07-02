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
  if (loading) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }
  console.log(playSkeleton);
  return (
    <EditScript
      getSelectedText={getSelectedText}
      linesPerMinute={playSkeleton.production?.lines_per_minute}
      playSkeleton={playSkeleton}
      selectedText={selectedText}
    />
  );
}
