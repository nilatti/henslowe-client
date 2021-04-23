import PropTypes from "prop-types";
import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import Datetime from "react-datetime"; //updated!

import { useConflicts } from "../Conflicts/ConflictStateProvider";
import { useForm, isAfterDate, getMinTime } from "../../hooks/environmentUtils";
import { DAYS_OF_WEEK } from "../../utils/hardcodedConstants";
import { firstLetterUpcase } from "../../utils/stringUtils";

export default function ConflictPatternCreatorForm({ cancel, onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    category: "",
    end_date: "",
    end_time: "",
    start_date: "",
    start_time: "",
    days_of_week: [],
  });

  function handleDateTimeChange(time, name) {
    let e = {
      target: {
        value: time,
        name: name,
        type: "datetime",
      },
    };
    handleChange(e);
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      processSubmit();
      cancel();
    }
  }

  function processSubmit() {
    let parentTypeId = parentType + "_id";
    onFormSubmit({
      category: inputs.category,
      end_date: inputs.end_date,
      end_time: inputs.end_time,
      start_date: inputs.start_date,
      start_time: inputs.start_time,
      days_of_week: inputs.days_of_week,
      [parentTypeId]: parentId,
    });
  }

  const { parentType, parentId, conflictReasonsArray } = useConflicts();
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label>I have a conflict every</Form.Label>
        {DAYS_OF_WEEK.map((day) => (
          <Form.Check
            id={day}
            key={day}
            label={firstLetterUpcase(day)}
            value={firstLetterUpcase(day)}
            name="days_of_week"
            type="checkbox"
            onChange={handleChange}
            type="checkbox"
          />
        ))}
      </Form.Group>
      <Form.Group controlId="start_time">
        <Form.Label>Starting at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) => handleDateTimeChange(time, "start_time")}
          required
          value={inputs.start_time}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>and ending at...</Form.Label>
        <Datetime
          dateFormat={false}
          format={"hh:mm A"}
          onChange={(time) => handleDateTimeChange(time, "end_time")}
          required
          value={inputs.end_time}
          // timeConstraints={getMinTime(inputs.start_time)}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label>From</Form.Label>
        <Datetime
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) => handleDateTimeChange(date, "start_date")}
          required
          value={inputs.start_date}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>To</Form.Label>
        <Datetime
          isValidDate={(current) => isAfterDate(inputs.start_date, current)}
          timeFormat={false}
          format={"MM/DD/YYYY"}
          onChange={(date) => handleDateTimeChange(date, "end_date")}
          required
          value={inputs.end_date}
        />
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">Category</Form.Label>
        <Col sm={10} className="form-radio">
          {conflictReasonsArray.map((reason) => (
            <Form.Check
              key={reason}
              checked={inputs.category === reason}
              id={`recurring_${reason}`}
              label={firstLetterUpcase(reason)}
              name="category"
              onChange={handleChange}
              type="radio"
              value={reason}
            />
          ))}
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" block>
        Submit
      </Button>
      <Button type="button" onClick={() => cancel(false)} block>
        Cancel
      </Button>
    </Form>
  );
}

ConflictPatternCreatorForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
