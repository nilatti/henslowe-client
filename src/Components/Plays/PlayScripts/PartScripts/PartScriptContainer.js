import { useState } from "react";
import styled from "styled-components";
import PartScriptPresenter from "./PartScriptPresenter.js";
import PartScriptSelector from "./PartScriptSelector.js";
import { Button } from "../../../Button.js";

const PartScriptContainerStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
export default function PartScriptContainer({ actors, play }) {
  const [context, setContext] = useState();
  const [selectOpen, setSelectOpen] = useState(false);

  function contextOrganizer(actors, characters) {
    setContext(actors.concat(characters));
    setSelectOpen(false);
  }
  return (
    <PartScriptContainerStyles>
      {selectOpen || !context ? (
        <PartScriptSelector
          actors={actors}
          onFormSubmit={contextOrganizer}
          characters={play.characters}
          play={play}
        />
      ) : (
        <>
          <Button onClick={() => setSelectOpen(true)}>
            Select roles and actors
          </Button>
          <PartScriptPresenter context={context} play={play} />
        </>
      )}
    </PartScriptContainerStyles>
  );
}
