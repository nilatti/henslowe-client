import styled from "styled-components";

export const ButtonContainer = styled.div``;
export const CharacterName = styled.div`
  font-weight: bold;
  overflow-wrap: break-word;
  padding-left: 10px;
`;

export const EditAreaStyles = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const EditScriptStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 40px;
  text-align: center;
`;

export const Line = styled.div`
  justify-self: start;
`;
export const LineNumber = styled.div``;
export const LineShowStyles = styled.div`
  background: ${(props) =>
    props.index % 2 === 0 ? "var(--color-light)" : "var(--color-background)"};
  display: grid;
  grid-template-columns: [line-number] 7% [character-name] 15% [line-text] auto [cut-buttons] 20% [end];
  align-items: center;
`;
export const LineShowStylesNonEdit = styled.div`
  align-items: center;
  background: var(--color-background);
  display: grid;
  grid-template-columns: [line-number] 10% [character-name] 25% [line-text] auto [end];
  padding-top: ${(props) => (props.targetCharacter ? "10px" : "50px")};
`;

export const TextEditStyles = styled.div`
  border-left: 1px solid var(--color-light);
  flex: 3 0 70%;
  padding-left: 35px;
`;

export const TextSelectStyles = styled.div`
  flex: 1 0 15%;
  padding-right: 15px;
  .rstm-tree-item {
    display: flex;
    padding: 2px;
  }
  .rstm-tree-item-level2 {
    padding-left: 4.25rem !important;
  }
  .rstm-tree-item--active,
  .rstm-tree-item--focused {
    background-color: var(--color-light);
  }
  .rstm-toggle-icon {
    padding: 0 7px;
  }
`;
