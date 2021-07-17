import uuid from "react-uuid";
import ActorParts from "./ActorParts";
import CharacterParts from "./CharacterParts";
import { Button } from "../../Button";
import { buildUserName } from "../../../utils/actorUtils";
export default function PartScriptPresenter({ context, play }) {
  let elementArray = [];
  let linkArray = context.map((contextItem, index) => (
    <Button
      onClick={() => {
        const containerToScrollTo = elementArray[index];
        containerToScrollTo.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {contextItem.name || buildUserName(contextItem)}
    </Button>
  ));

  let roles = context.map((item) => {
    if ("first_name" in item) {
      return (
        <div
          key={uuid()}
          ref={(containerElement) => elementArray.push(containerElement)}
        >
          <ActorParts actor={item} play={play} />
        </div>
      );
    } else {
      return (
        <div
          key={uuid()}
          ref={(containerElement) => elementArray.push(containerElement)}
        >
          <CharacterParts character={item} play={play} />
        </div>
      );
    }
  });
  return (
    <div>
      <hr />
      {linkArray}
      <div>{roles}</div>
    </div>
  );
}
