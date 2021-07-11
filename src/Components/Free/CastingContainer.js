import { useState } from "react";
import CastingForm from "../Jobs/CastingForm";
import CastingShow from "../Jobs/CastingShow";
import { usePlayState } from "../../lib/freePlayState";
import { buildUserName } from "../../utils/actorUtils";
export default function CastingContainer({ casting, onDeleteClick }) {
  const { fakeActorsArray, updateActorJobs, updateCastings } = usePlayState();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    casting.user
      ? [
          {
            id: casting.user?.id,
            name: buildUserName(casting.user),
          },
        ]
      : []
  );

  let lineCount =
    casting.character.new_line_count || casting.character.old_line_count;
  function handleChangeUser(e) {
    if (e.length > 0) {
      toggleForm();
      updateActorJobs(e[0], casting);
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
          availableActors={fakeActorsArray}
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
