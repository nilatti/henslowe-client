import styled from "styled-components";

const DayGroupStyle = styled.div`
  /* background-color: ${(props) =>
    props.backgroundColor || "var(--color-light)"}; */
  padding: 20px;
  border-top: solid 2px var(--color-dark);
`;

export default function RehearsalDayGroup({ date, children }) {
  return (
    <DayGroupStyle>
      <h3>{date}</h3>
      {children}
    </DayGroupStyle>
  );
}
