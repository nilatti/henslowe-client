export default function CastingShow({
  casting,
  handleEditClick,
  lineCount,
  selectedUser,
  onDeleteClick,
}) {
  return (
    <div>
      <span>{casting.character.name}: </span>
      {lineCount > 0 ? <em> ({lineCount}) </em> : <span> </span>}
      <span>
        {selectedUser.length > 0 ? (
          <span onClick={handleEditClick}>{selectedUser[0].name}</span>
        ) : (
          <span onClick={handleEditClick}>
            <strong>Needs to be cast</strong>
          </span>
        )}

        <span
          className="right floated trash icon"
          onClick={() => onDeleteClick(casting.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </span>
    </div>
  );
}
