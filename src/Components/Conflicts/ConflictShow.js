import Moment from "react-moment";
import PropTypes from "prop-types";

export default function ConflictShow({
  conflict,
  handleEditClick,
  handleDeleteClick,
  role,
}) {
  function onDeleteClick() {
    handleDeleteClick(conflict.id);
  }
  return (
    <>
      <Moment format="h:mm A MMM D, YYYY">{conflict.start_time}</Moment>-
      <Moment format="h:mm A MMM D, YYYY">{conflict.end_time}</Moment>
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
