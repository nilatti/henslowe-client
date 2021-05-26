import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import moment from "moment";

export default function ConflictPatternShow({
  conflictPattern,
  handleDeleteClick,
}) {
  let daysOfWeek = JSON.parse(conflictPattern.days_of_week);
  daysOfWeek = daysOfWeek.map(
    (day) => day[0].toUpperCase() + day.substring(1) + "s"
  );
  daysOfWeek = daysOfWeek.join(", ");
  return (
    <Col md={12}>
      {daysOfWeek} from {moment(conflictPattern.start_time).format("h:mm a")}-
      {moment(conflictPattern.end_time).format("h:mm a")} (
      {conflictPattern.category}){" "}
      {conflictPattern.start_date && (
        <span>
          {conflictPattern.start_date} to {conflictPattern.end_date}
        </span>
      )}
      <span
        className="right floated trash icon"
        onClick={() => handleDeleteClick(conflictPattern.id)}
      >
        <i className="fas fa-trash-alt"></i>
      </span>
    </Col>
  );
}

ConflictPatternShow.propTypes = {
  conflictPattern: PropTypes.shape({
    category: PropTypes.string,
    end_date: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    days_of_week: PropTypes.string.isRequired,
  }),
  handleDeleteClick: PropTypes.func.isRequired,
};
