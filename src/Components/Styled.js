import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: auto;
  width: 80%;
`;

export const EditIcons = styled.div`
  display: inline;
  font-size: 17px;
  cursor: pointer;
`;

export const FancyRadio = styled.input`
  display: none;
  &:checked + div {
    background-color: var(--color-dark);
    span {
      color: var(--color-text-light);
      &:before {
        opacity: 1;
      }
    }
  }
`;

export const FancyRadioLabelBox = styled.div`
  align-items: center;
  background-color: var(--color-light);
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  font-weight: 900;
  height: auto;
  justify-content: center;
  margin: 5px 0;
  padding: 15px;
  transition: all 250ms ease;
  text-align: center;
  width: 200px;
  will-change: transition;
  &:active {
    transform: translateY(10px);
  }
  span {
    color: var(--color-text-dark);
    font-size: 1.5em;
    transition: all 300ms ease;
    user-select: none;
  }
`;

export const FancyCheckBox = styled.label`
  background-color: ${(props) => props.backgroundColor || "var(--color-light)"};
  .not-recommended {
    background-color: var(--color-light-disabled);
    font-style: italic;
  }
  & > ${FancyRadio}:checked ~ div {
    background-color: var(--color-dark);
    color: var(--color-text-light);
  }
`;

export const FancyCheckBoxLabel = styled.div`
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "var(--color-light)"};
  color: var(--color-text-dark);
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1em;
  font-weight: 400;
  height: auto;
  justify-content: center;
  margin: 5px 0;
  padding: 15px;
  transition: all 250ms ease;
  text-align: center;
  width: 200px;
  will-change: transition;
  &:active {
    transform: translateY(10px);
  }
`;

export const DefaultTable = styled.table`
  margin-top: 25px;
  width: 100%;
  th {
    font-weight: 600;
  }
  td {
    padding: 5px;
  }
  tr:nth-child(odd) {
    background-color: var(--color-background);
  }
`;

export const InfoTabStyles = styled.div`
  padding: 25px 0;
  div {
    padding: 7px 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  align-items: center;
  div {
    padding: 15px 0;
  }
  h2 {
    display: flex;
    justify-content: center;
    padding: 0 5px;
    div {
      font-size: 0.8em;
    }
  }
`;
