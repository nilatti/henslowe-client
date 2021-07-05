import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";

import CastingContainer from "./CastingContainer";
// import NewCasting from "./NewCasting";
import { usePlayState } from "../../lib/freePlayState";

export default function Casting({ availableActors }) {
  const { castings, fakeActors, play } = usePlayState();
  let actorsArray = availableActors.female.concat(availableActors.male);
  let castingsItems = castings.map((casting) => (
    <li key={casting.id}>
      <CastingContainer
        availableActors={actorsArray}
        casting={casting}
        onDeleteClick={() => console.log()}
      />
    </li>
  ));
  return <div>{castingsItems}</div>;
}
