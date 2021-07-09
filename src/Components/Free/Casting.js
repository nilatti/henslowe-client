import CastingContainer from "./CastingContainer";
// import NewCasting from "./NewCasting";
import { usePlayState } from "../../lib/freePlayState";

export default function Casting({}) {
  const { castings } = usePlayState();

  let castingsItems = castings.map((casting) => (
    <li key={casting.character.id}>
      <CastingContainer casting={casting} onDeleteClick={() => console.log()} />
    </li>
  ));
  return <div>{castingsItems}</div>;
}
