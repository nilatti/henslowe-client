import { useEffect, useState } from "react";
import CastingForm from "./CastingForm";
import CastingShow from "./CastingShow";
import { buildUserName } from "../../utils/actorUtils";
export default function CastingContainer({
  availableActors,
  casting,
  onDeleteClick,
  onFormSubmit,
}) {
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
  useEffect(() => {
    setSelectedUser(
      casting.user
        ? [
            {
              id: casting.user?.id,
              name: buildUserName(casting.user),
            },
          ]
        : []
    );
  }, [JSON.stringify(casting.user)]);
  function handleChangeUser(e) {
    if (e.length > 0) {
      toggleForm();
      setSelectedUser([e[0]]);
    } else {
      setSelectedUser([]);
    }
    onFormSubmit(casting, e[0]);
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
