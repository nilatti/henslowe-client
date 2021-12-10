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
export function StartEndDatePair({
  endDate,
  endLabel,
  endName,
  handleChange,
  startDate,
  startLabel,
  startName,
}) {
  const [tempStartDate, setTempStartDate] = useState(startDate);

  function handleStartDateChange(date, startName, handleChange) {
    //this is a hacky workaround that keeps the end time after the start time.
    setTempStartDate(date);
    handleDateTimeChange(date, startName, handleChange);
  }

  endName = endName || "end_date";
  startName = startName || "start_date";
  return (
    <>
      <Form.Group controlId="start_date">
        <Form.Label>{startLabel || "From"}</Form.Label>
        <Datetime
          format={"MM/DD/YYYY"}
          name={startName || "startDate"}
          onChange={(date) =>
            handleStartDateChange(date, startName, handleChange)
          }
          required
          timeFormat={false}
          value={startDate}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>{endLabel || "To"}</Form.Label>
        <Datetime
          name={endName || "endDate"}
          format={"MM/DD/YYYY"}
          isValidDate={(current) => isAfterDate(tempStartDate, current)}
          onChange={(date) => handleDateTimeChange(date, endName, handleChange)}
          required
          timeFormat={false}
          value={endDate || ""}
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
