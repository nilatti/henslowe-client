import { useState } from "react";
import { Form } from "react-bootstrap";
import Datetime from "react-datetime"; //updated!

import { isAfterDate, isAfterTime } from "../utils/dateTimeUtils";

let valid = function (current, startTime) {
  return current.isSame(startTime, "day") || current.isAfter(startTime);
};

function handleDateTimeChange(time, name, handleChange) {
  let event = {
    target: {
      value: time,
      name: name,
      type: "datetime",
    },
  };
  handleChange(event);
}
export function StartEndDatePair({ endDate, handleChange, startDate }) {
  if (typeof endDate == "string") {
    endDate = new Date(endDate);
  }
  if (typeof startDate == "string") {
    startDate = new Date(startDate);
  }
  const [tempStartDate, setTempStartDate] = useState(startDate);

  function handleStartDateChange(date, handleChange) {
    //this is a hacky workaround that keeps the end time after the start time.
    setTempStartDate(date);
    handleDateTimeChange(date, "start_date", handleChange);
  }
  return (
    <>
      <Form.Group controlId="start_date">
        <Form.Label>From</Form.Label>
        <Datetime
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) => handleStartDateChange(date, handleChange)}
          required
          value={startDate}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>To</Form.Label>
        <Datetime
          isValidDate={(current) => isAfterDate(tempStartDate, current)}
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) =>
            handleDateTimeChange(date, "end_date", handleChange)
          }
          required
          value={endDate}
        />
      </Form.Group>
    </>
  );
}

export function StartEndTimePair({ endTime, handleChange, startTime }) {
  return (
    <>
      <Form.Group controlId="start_time">
        <Form.Label>Starting at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) =>
            handleDateTimeChange(time, "start_time", handleChange)
          }
          required
          value={startTime}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>and ending at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) =>
            handleDateTimeChange(time, "end_time", handleChange)
          }
          required
          value={endTime}
        />
      </Form.Group>
    </>
  );
}

export function StartEndDateTimePair({ endTime, handleChange, startTime }) {
  return (
    <>
      <Form.Group controlId="start_time">
        <Form.Label>Start Time</Form.Label>
        <Datetime
          type="datetime"
          onChange={(time) =>
            handleDateTimeChange(time, "start_time", handleChange)
          }
          name="start_time"
          value={startTime}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>End Time</Form.Label>
        <Datetime
          name="end_time"
          onChange={(time) =>
            handleDateTimeChange(time, "end_time", handleChange)
          }
          type="datetime"
          value={endTime}
          isValidDate={(current) => valid(current, startTime)}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    </>
  );
}
