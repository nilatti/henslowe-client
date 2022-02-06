import { useMeState } from "../../lib/meState.js";
import { DisplayDateTimeRange } from "../../utils/dateTimeUtils.js";

export default function ConflictShow({
  conflict,
  handleEditClick,
  handleDeleteClick,
  role,
}) {
  const { me } = useMeState();
  function onDeleteClick() {
    handleDeleteClick(conflict.id);
  }
  console.log(conflict);
  return (
    <>
      <DisplayDateTimeRange
        end_datetime={conflict.end_time}
        start_datetime={conflict.start_time}
        timezone={me.timezone}
      />
      {role && (role === "admin" || role === "self") && (
        <>
          : {conflict.category}
          <span className="right floated edit icon" onClick={handleEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span className="right floated trash icon" onClick={onDeleteClick}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </>
      )}
    </>
  );
}
