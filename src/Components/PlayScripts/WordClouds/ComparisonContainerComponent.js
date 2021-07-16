import { forwardRef, useRef } from "react";

import ReactWordcloud from "react-wordcloud";
import styled from "styled-components";
import WordCount from "./WordCount";
import { Button } from "../../Button";
const CloudContainer = styled.div`
  max-height: 700px;
`;
const ComparisonContainerStyles = styled.div`
  border-top: 2px solid var(--color-light);
  display: flex;
  flex-flow: column nowrap;
  margin-top: 35px;
`;
const ComparisonHeader = styled.h2`
  text-align: center;
`;
const ComparisonItem = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
const ComparisonPair = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
const ComparisonContainerComponent = forwardRef(({ context, words }, ref) => {
  return (
    <ComparisonContainerStyles ref={ref}>
      <ComparisonHeader id={context.item.label || context.item.name}>
        {context.item.label || context.item.name}
      </ComparisonHeader>
      <Button onClick={scrollToTop}>Back to top</Button>
      <ComparisonPair>
        <ComparisonItem>
          <h3>Original text</h3>
          <CloudContainer>
            <ReactWordcloud
              callbacks={callbacks}
              options={options}
              size={size}
              words={includedOriginalWords}
            />
          </CloudContainer>
          <WordCount
            list="originalContent"
            updateWordList={updateWords}
            wordList={words.originalContent}
          />
        </ComparisonItem>
        <ComparisonItem>
          <h3>Cut text</h3>
          <CloudContainer>
            <ReactWordcloud
              callbacks={callbacks}
              options={options}
              size={size}
              words={includedNewWords}
            />
          </CloudContainer>
          <WordCount
            list="newContent"
            updateWordList={updateWords}
            wordList={words.newContent}
          />
        </ComparisonItem>
      </ComparisonPair>
    </ComparisonContainerStyles>
  );
});

export default ComparisonContainerComponent;
