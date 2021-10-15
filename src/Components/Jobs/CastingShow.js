import styled from "styled-components";

const CastingShowStyles = styled.div`
  color: ${(props) => props.colorProp || "black"};
`;
export default function CastingShow({
  casting,
  handleEditClick,
  lineCount,
  selectedUser,
  onDeleteClick,
}) {
  return (
    <CastingShowStyles>
      <span>{casting.character.name}: </span>
      {lineCount > 0 ? <em> ({lineCount}) </em> : <span> </span>}
      <span>
        {selectedUser.length > 0 ? (
          <span
            onClick={handleEditClick}
            style={
              casting.user.fake ? { color: "var(--fake-actor)" } : { color: "" }
            }
          >
            {selectedUser[0].name}
          </span>
        ) : (
          <span onClick={handleEditClick}>
            <strong>Click to cast</strong>
          </span>
        )}
        <span
          className="right floated trash icon"
          onClick={(e) => {
            if (
              window.confirm("Are you sure you wish to delete this character?")
            )
              onDeleteClick(casting.id);
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </span>
    </CastingShowStyles>
  );
}
