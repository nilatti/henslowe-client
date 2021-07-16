import { forwardRef, useRef, useEffect, useState } from "react";
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

const ComparisonContainer = forwardRef(({ context }, ref) => {
  const [words, setWords] = useState(context.lines);
  const [includedOriginalWords, setIncludedOriginalWords] = useState([
    words.originalWords,
  ]);
  const [includedNewWords, setIncludedNewWords] = useState([words.newWords]);

  useEffect(() => {
    setIncludedNewWords(words.newContent.filter((word) => word.include));
  }, [JSON.stringify(words.newContent)]);

  useEffect(() => {
    setIncludedOriginalWords(
      words.originalContent.filter((word) => word.include)
    );
  }, [JSON.stringify(words.originalContent)]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function updateWords(newList, list) {
    //updated list of words, identifier of which list it is (newContet, originalContent)
    let updatedList = { ...words };
    updatedList[list] = newList;
    setWords(updatedList);
  }

  const callbacks = {
    onWordClick: console.log,
    getWordTooltip: (word) => `${word.text} (${word.value})`,
  };
  let options = {
    fontSizes: [20, 100],
  };
  let size = [500, 500];
  if (!words.originalContent) {
    return <div>Loading words</div>;
  }
  return (
    <ComparisonContainerStyles>
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

export default ComparisonContainer;
