//this is the container for part scripts for UNPAID customers. It talks to the play state provider
import SelectPlay from "./SelectPlay.js";

import { Spinner } from "../Loaders.js";
import Modal from "../Modal.js";
import { Button } from "../Button.js";
import PartScriptContainer from "../Plays/PlayScripts/PartScripts/PartScriptContainer.js";
import { usePlayState } from "../../lib/freePlayState.js";

export default function PartScripts() {
  const { fakeActorsArray, loading, play, setPlay } = usePlayState();
  function clearPlay() {
    setPlay(null);
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
      <div>Get part scripts for {play.title}</div>
      <Button onClick={clearPlay}>Select a different play</Button>
      <PartScriptContainer actors={fakeActorsArray} play={play} />
    </>
  );
}
