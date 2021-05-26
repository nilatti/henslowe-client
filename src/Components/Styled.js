import styled from "styled-components";

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
  background-color: var(--color-light);
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
