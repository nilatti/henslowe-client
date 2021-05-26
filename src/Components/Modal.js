import styled from "styled-components";
const ModalStyle = styled.div`
  background-color: rgba(105, 105, 105, 0.5);
  color: white;
  height: 100%;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1010;
`;
const ModalInnerStyle = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow: auto;
  padding: 20px 50px 20px 20px;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export default function Modal({ children }) {
  return (
    <ModalStyle>
      <ModalInnerStyle>{children}</ModalInnerStyle>
    </ModalStyle>
  );
}
