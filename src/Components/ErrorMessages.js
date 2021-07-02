import styled from "styled-components";
import uuid from "react-uuid";

const ErrorStyles = styled.div`
  background-color: #cd5c5c;
  color: #800000;
`;

export default function ErrorMessages({ errors }) {
  let errorsList = errors.map((error) => <li key={uuid()}>{error}</li>);
  return (
    <ErrorStyles>
      <ul>{errorsList}</ul>
    </ErrorStyles>
  );
}
