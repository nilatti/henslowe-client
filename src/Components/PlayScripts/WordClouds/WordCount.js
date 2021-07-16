import styled from "styled-components";

const WordCountStyles = styled.table`
  th,
  td {
    border: 1px solid var(--color-light);
    padding: 5px;
  }
  .removed {
    color: red;
    text-decoration: line-through;
  }
`;
export default function WordCount({ list, updateWordList, wordList }) {
  function addWord(word) {
    let newWord = { ...word, include: true };
    let newWordList = wordList.map((oldWord) => {
      if (oldWord == word) {
        return newWord;
      } else {
        return oldWord;
      }
    });

    updateWordList(newWordList, list);
  }

  function removeWord(word) {
    let newWord = { ...word, include: false };
    let newWordList = wordList.map((oldWord) => {
      if (oldWord == word) {
        return newWord;
      } else {
        return oldWord;
      }
    });

    updateWordList(newWordList, list);
  }
  let wordRows = wordList.map((word) => (
    <tr key={word.text}>
      <td>
        {word.include ? (
          <span
            className="right floated trash icon"
            onClick={() => removeWord(word)}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        ) : (
          <span
            className="right floated recycle icon"
            onClick={() => addWord(word)}
          >
            <i className="fas fa-recycle"></i>
          </span>
        )}
      </td>
      <td className={word.include ? "" : "removed"}>{word.text}</td>
      <td className={word.include ? "" : "removed"}>{word.value}</td>
    </tr>
  ));
  return (
    <div>
      <WordCountStyles>
        <thead>
          <tr>
            <th>
              add/
              <br />
              remove
            </th>
            <th>word</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>{wordRows}</tbody>
      </WordCountStyles>
    </div>
  );
}
