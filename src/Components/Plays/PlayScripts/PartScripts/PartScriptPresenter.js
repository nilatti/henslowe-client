import uuid from "react-uuid";
import styled from "styled-components";
import ActorParts from "./ActorParts.js";
import CharacterParts from "./CharacterParts.js";
import { Button } from "../../../Button.js";
import { buildUserName } from "../../../../utils/actorUtils.js";

const ButtonDivStyle = styled.div`
  border: 3px solid var(--color-dark);
  border-radius: 4px;
  padding: 25px;
`;

const RoleDivStyle = styled.div`
  padding-top: 25px;
`;
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
        <RoleDivStyle
          key={uuid()}
          ref={(containerElement) => elementArray.push(containerElement)}
        >
          <ActorParts actor={item} play={play} />
          <hr />
        </RoleDivStyle>
      );
    } else {
      return (
        <RoleDivStyle
          key={uuid()}
          ref={(containerElement) => elementArray.push(containerElement)}
        >
          <CharacterParts character={item} play={play} />
          <hr />
        </RoleDivStyle>
      );
    }
  });
  return (
    <div>
      <hr />
      <ButtonDivStyle>
        <h3>Jump to parts:</h3>
        {linkArray}
      </ButtonDivStyle>
      <div>{roles}</div>
    </div>
  );
}
