import { useState } from "react";
import styled from "styled-components";
import info from "./Images/info_icon.png";

const ToolTipStyles = styled.div``;
const InfoBox = styled.div`
  width: 250px;
  background-color: var(--color-med);
  color: var(--color-text-light);
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
`;

export default function ToolTip({ children, icon }) {
  const [display, setDisplay] = useState(false);
  function handleMouseEvent() {
    setDisplay(!display);
  }
  return (
    <ToolTipStyles>
      <img
        src={icon || info}
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
      />
      {display && <InfoBox>{children}</InfoBox>}
    </ToolTipStyles>
  );
}
