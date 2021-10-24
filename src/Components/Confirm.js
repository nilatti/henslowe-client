import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
`;

const Container = styled.div`
  /* display: none; */
  flex-direction: column;
  position: fixed;
  background-color: #f37736;
  width: 230px;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.3rem;
  padding: 1rem;
  z-index: 5; /* Higher than the z-index of the background */
`;

const ConfirmationButton = styled.button`
  display: inline-flex;
  background-color: #cc0000;
  color: white;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
`;
const ConfirmationText = styled.div`
  display: flex;
  color: white;
  margin: 0.5rem 0 2rem;
  text-align: center;
  line-height: 2rem;
  font-size: 1.1rem;
`;
export default function Confirm({ children }) {
  return <Container>{children}</Container>;
}
