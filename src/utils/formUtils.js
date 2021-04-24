import { Form } from "react-bootstrap";
import Datetime from "react-datetime"; //updated!
import PropTypes from "prop-types";
import moment from "moment";

import { isAfterDate } from "../hooks/environmentUtils";
export function StartEndDatePair({ endDate, handleChange, startDate }) {
  function handleDateTimeChange(time, name) {
    let event = {
      target: {
        value: time,
        name: name,
        type: "datetime",
      },
    };
    handleChange(event);
  }
  return (
    <>
      <Form.Group controlId="start_date">
        <Form.Label>From</Form.Label>
        <Datetime
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) => handleDateTimeChange(date, "start_date")}
          required
          value={startDate}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>To</Form.Label>
        <Datetime
          isValidDate={(current) => isAfterDate(startDate, current)}
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) => handleDateTimeChange(date, "end_date")}
          required
          value={endDate}
        />
      </Form.Group>
    </>
  );
}

export function StartEndTimePair({ endTime, handleChange, startTime }) {
  function handleDateTimeChange(time, name) {
    let event = {
      target: {
        value: time,
        name: name,
        type: "datetime",
      },
    };
    handleChange(event);
  }
  return (
    <>
      <Form.Group controlId="start_time">
        <Form.Label>Starting at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) => handleDateTimeChange(time, "start_time")}
          required
          value={moment(startTime)}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>and ending at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) => handleDateTimeChange(time, "end_time")}
          required
          value={moment(endTime)}
          // timeConstraints={getMinTime(inputs.start_time)}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export function StartEndDateTimePair({ endTime, handleChange, startTime }) {
  function handleDateTimeChange(time, name) {
    let event = {
      target: {
        value: time,
        name: name,
        type: "datetime",
      },
    };
    handleChange(event);
  }
  return (
    <>
      <Form.Group controlId="start_time">
        <Form.Label>Start Time</Form.Label>
        <Datetime
          type="datetime"
          onChange={(time) => handleDateTimeChange(time, "start_time")}
          name="start_time"
          value={moment(startTime)}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>End Time</Form.Label>
        <Datetime
          onChange={(time) => handleDateTimeChange(time, "end_time")}
          type="datetime"
          value={moment(endTime)}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
