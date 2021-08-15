//this is the container for doubling for UNPAID customers. It talks to the play state provider
import Casting from "./Casting";
import SelectPlay from "./SelectPlay";
import { Button } from "../Button";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import DoublingChartContainer from "./DoublingChartContainer";
import FakeActors from "../Productions/FakeActors";

import { usePlayState } from "../../lib/freePlayState";

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
