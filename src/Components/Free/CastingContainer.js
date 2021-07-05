import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import CastingForm from "../Jobs/CastingForm";
import CastingShow from "../Jobs/CastingShow";
import { usePlayState } from "../../lib/freePlayState";
export default function CastingContainer({
  availableActors,
  casting,
  onDeleteClick,
}) {
  const { castings, updateCastings } = usePlayState();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    casting.user
      ? [
          {
            id: casting.user?.id,
            label: casting.user?.name,
          },
        ]
      : []
  );

  let lineCount =
    casting.character.new_line_count || casting.character.old_line_count;
  function handleChangeUser(e) {
    if (e.length > 0) {
      toggleForm();
      updateCastings(casting, e[0]);
      setSelectedUser([e[0]]);
    }
  }

  function toggleForm() {
    setEditFormOpen(!editFormOpen);
  }

  return (
    <div key={casting.character.id}>
      {editFormOpen ? (
        <CastingForm
          availableActors={availableActors}
          casting={casting}
          handleChangeUser={handleChangeUser}
          selectedUser={selectedUser}
          toggleForm={toggleForm}
        />
      ) : (
        <CastingShow
          casting={casting}
          handleEditClick={toggleForm}
          lineCount={lineCount}
          onDeleteClick={onDeleteClick}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}
