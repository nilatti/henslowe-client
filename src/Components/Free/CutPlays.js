//this is the container for play editing for UNPAID customers. It talks to the play state provider
import { useState } from "react";
import { usePlayState } from "../../lib/freePlayState";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { Spinner } from "../Loaders";
import Modal from "../Modal";

import SelectPlay from "./SelectPlay";
import EditScript from "./EditScript";

export default function CutPlays() {
  const { characters, loading, play, playSkeleton, setPlay, updateLine } =
    usePlayState();
  const [selectedText, setSelectedText] = useState();
  const [linesPerMinute, setLinesPerMinute] = useState("");
  function clearPlay() {
    setPlay(null);
  }
  function getSelectedText(textMenuKey, textUnit) {
    let response = {};
    if (textUnit === "play") {
      response = play;
    } else if (textUnit === "act") {
      response = play.acts.find(({ id }) => id == textMenuKey);
    } else if (textUnit === "scene") {
      let textUnitIds = textMenuKey.match(/(\d+)\/(\d+)/);
      let act = play.acts.find(({ id }) => id == textUnitIds[1]);
      response = act.scenes.find(({ id }) => id == textUnitIds[2]);
    } else if (textUnit === "frenchScene") {
      let textUnitIds = textMenuKey.match(/(\d+)\/(\d+)\/(\d+)/);
      let act = play.acts.find(({ id }) => id == textUnitIds[1]);
      let scene = act.scenes.find(({ id }) => id == textUnitIds[2]);
      response = scene.french_scenes.find(({ id }) => id == textUnitIds[3]);
    }
    let responseDataWithTextUnit = { ...response, textUnit };
    setSelectedText(responseDataWithTextUnit);
  }

  function handleChange(e) {
    setLinesPerMinute(e.target.value);
  }

  if (!play?.id) {
    return <SelectPlay />;
  }

  if (loading) {
    return (
      <Modal>
        <h1>Loading play</h1>
        <div>
          This takes a little while, but it only has to happen once until you
          switch plays or close your browser
        </div>
        <Spinner />
      </Modal>
    );
  }
  return (
    <>
      <div>Are you ready to cut {play.title}?</div>
      <Button onClick={clearPlay}>Select a different play</Button>
      <Form width="50%">
        <FormGroupInline>
          <label>Lines Per Minute</label>
          <input
            name="lines per minute"
            onChange={handleChange}
            type="number"
            value={linesPerMinute}
          />
        </FormGroupInline>
      </Form>
      <EditScript
        characters={characters}
        getSelectedText={getSelectedText}
        linesPerMinute={linesPerMinute}
        playSkeleton={playSkeleton}
        selectedText={selectedText}
      />
    </>
  );
}
