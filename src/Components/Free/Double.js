//this is the container for doubling for UNPAID customers. It talks to the play state provider
import SelectPlay from "./SelectPlay.js";
import { Button } from "../Button.js";
import { Spinner } from "../Loaders.js";
import Modal from "../Modal.js";
import DoublingChartContainer from "./DoublingChartContainer.js";
import FakeActors from "../Productions/FakeActors.js";

import { usePlayState } from "../../lib/freePlayState.js";

export default function Double() {
  const { loading, fakeActors, fakeActorsArray, setFakeActors, play, setPlay } =
    usePlayState();
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
      <h2>Doubling chart for {play.title}</h2>
      <Button onClick={clearPlay}>Select a different play</Button>
      <DoublingChartContainer />
    </>
  );
}
