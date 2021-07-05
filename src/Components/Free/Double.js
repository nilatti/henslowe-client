//this is the container for doubling for UNPAID customers. It talks to the play state provider
import { useState } from "react";
import Casting from "./Casting";
import SelectPlay from "./SelectPlay";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import FakeActors from "../Productions/FakeActors";

import { usePlayState } from "../../lib/freePlayState";

export default function Double() {
  const { loading, fakeActors, setFakeActors, play, setPlay } = usePlayState();
  function clearPlay() {
    setPlay(null);
  }
  console.log(fakeActors);

  let actorsList = { female: [], male: [], nonbinary: [] };

  for (let i = 0; i < fakeActors.female; i++) {
    actorsList.female.push({ id: i, name: `Female ${i + 1}` });
  }
  for (let i = 0; i < fakeActors.male; i++) {
    actorsList.male.push({ id: i, name: `Male ${i + 1}` });
  }
  for (let i = 0; i < fakeActors.nonbinary; i++) {
    actorsList.nonbinary.push({ id: i, name: `Nonbinary ${i + 1}` });
  }
  console.log(actorsList);

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
      <div> are you ready to double {play.title}?</div>
      <Button onClick={clearPlay}>Select a different play</Button>
      <FakeActors actors={fakeActors} onSubmit={setFakeActors} />
      {(!!actorsList.female.length ||
        !!actorsList.male.length ||
        !!actorsList.nonbinary.length) && (
        <Casting availableActors={actorsList} />
      )}
    </>
  );
}
