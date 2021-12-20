import Moment from "react-moment";
import PropTypes from "prop-types";
import { useMeState } from "../../lib/meState";
import {
  DATE_TIME_FORMAT,
  DEFAULT_TIMEZONE,
} from "../../utils/hardcodedConstants";

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
  return (
    <>
      <Moment format={DATE_TIME_FORMAT} tz={me.timezone || DEFAULT_TIMEZONE}>
        {conflict.start_time}
      </Moment>
      -
      <Moment format={DATE_TIME_FORMAT} tz={me.timezone || DEFAULT_TIMEZONE}>
        {conflict.end_time}
      </Moment>
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
