//this is the container for doubling for UNPAID customers. It talks to the play state provider
import SelectPlay from "./SelectPlay";
import WordCloudPresenter from "../PlayScripts/WordClouds/WordCloudContainer";
import { Button } from "../Button";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import { usePlayState } from "../../lib/freePlayState";

export default function Double() {
  const { loading, play, setPlay } = usePlayState();
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
      <div>Make a wordcloud for {play.title}</div>
      <Button onClick={clearPlay}>Select a different play</Button>
      <WordCloudPresenter play={play} />
    </>
  );
}
