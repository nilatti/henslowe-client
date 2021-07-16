import uuid from "react-uuid";
import ActorParts from "./ActorParts";
import CharacterParts from "./CharacterParts";
export default function PartScriptPresenter({ context, play }) {
  let roles = context.map((item) => {
    if ("first_name" in item) {
      return <ActorParts actor={item} play={play} key={uuid()} />;
    } else {
      return <CharacterParts character={item} play={play} key={uuid()} />;
    }
  });
  return <div>{roles}</div>;
}
