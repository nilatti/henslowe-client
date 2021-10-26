import { useState } from "react";
import styled from "styled-components";
import WordCloudPresenter from "./WordCloudPresenter";
import WordCloudSelector from "./WordCloudSelector";
import { Button } from "../../../Button";

const WordCloudContainerStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
export default function WordCloudContainer({ play }) {
  const [context, setContext] = useState();
  const [selectOpen, setSelectOpen] = useState(false);

  function contextOrganizer(content, character) {
    setContext(content.concat(character));
    setSelectOpen(false);
  }
  return (
    <WordCloudContainerStyles>
      {selectOpen || !context ? (
        <WordCloudSelector
          onFormSubmit={contextOrganizer}
          play={play}
          context={context}
        />
      ) : (
        <>
          <Button onClick={() => setSelectOpen(true)}>
            Select content to word cloud
          </Button>
          <WordCloudPresenter context={context} play={play} />
        </>
      )}
    </WordCloudContainerStyles>
  );
}
