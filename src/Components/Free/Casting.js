import CastingContainer from "./CastingContainer";
import FakeActors from "../Productions/FakeActors";

import SelectPlay from "./SelectPlay";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import { usePlayState } from "../../lib/freePlayState";

export default function Casting({}) {
  const {
    castings,
    loading,
    fakeActors,
    fakeActorsArray,
    setFakeActors,
    play,
    setPlay,
  } = usePlayState();
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

  let castingsItems = castings.map((casting) => (
    <li key={casting.character.id}>
      <CastingContainer casting={casting} onDeleteClick={() => console.log()} />
    </li>
  ));
  return (
    <>
      <FakeActors actors={fakeActors} onSubmit={setFakeActors} />
      {!!fakeActorsArray.length && <ul>{castingsItems}</ul>}
    </>
  );
}
