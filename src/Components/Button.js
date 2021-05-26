import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "var(--color-dark)"};
  border-color: ${(props) => props.borderColor || "var(--color-dark)"};
  border-radius: 4px;
  border-style: solid;
  color: ${(props) => props.colorProp || "var(--color-text-light)"};
  cursor: pointer;
  margin: 5px;
  max-width: 200px;

  padding: 7px;
  &:hover {
    background-color: ${(props) =>
      props.colorProp || "var(--color-text-light)"};
    border-color: ${(props) => props.borderColor || "var(--color-dark)"};
    color: ${(props) => props.backgroundColor || "var(--color-dark)"};
  }
  &:disabled {
    background-color: ${(props) =>
      props.backgroundColor || "var(--color-dark-disabled)"};
    border-color: ${(props) => props.borderColor || "var(--color-dark)"};
    color: ${(props) => props.colorProp || "var(--color-text-light)"};
    cursor: none;
  }
`;
