import moment from "moment";
import PropTypes from "prop-types";
import { useConflicts } from "../Conflicts/ConflictStateProvider";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import momentLocalizer from "react-widgets-moment";
import Datetime from "react-datetime"; //updated!
import { useForm } from "../../utils/environmentUtils";

import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants";
import { firstLetterUpcase } from "../../utils/stringUtils";
moment.locale("en");
momentLocalizer();
// const validate = ({ startTime, endTime }) => {
//   return {
//     endTime:
//       endTime < startTime
//         ? "Start time must be after end time."
//         : false
//   };
// };

export default function ConflictForm({ conflict, onFormClose, onFormSubmit }) {
  const { inputs, handleChange } = useForm(
    conflict || {
      category: "",
      end_time: new Date(),
      start_time: new Date(),
    }
  );

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
      onFormClose();
    }
  }

  function processSubmit() {
    let id;
    if (conflict) {
      id = conflict.id;
    }
    let parentTypeId = parentType + "_id";
    onFormSubmit(
      {
        id: id,
        category: inputs.category,
        end_time: inputs.end_time,
        start_time: inputs.start_time,
        [parentTypeId]: parentId,
      },
      "conflict"
    );
  }
  // const { validated } = this.state;
  const { parentType, parentId } = useConflicts();
  console.log(80, inputs);
  return (
    <Col
      md={{
        span: 8,
        offset: 2,
      }}
    >
      <Form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="start_time">
          <Form.Label>Start Time</Form.Label>
          <Datetime
            type="datetime"
            onChange={(time) => handleDateTimeChange(time, "start_time")}
            name="start_time"
            value={inputs.start_time}
          />
        </Form.Group>
        <Form.Group controlId="end_time">
          <Form.Label>End Time</Form.Label>
          <Datetime
            min={inputs.start_time}
            onChange={(time) => handleDateTimeChange(time, "end_time")}
            type="datetime"
            value={inputs.end_time}
          />
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
        <fieldset>
          <Form.Group as={Form.Row}>
            <Form.Label as="legend">Category</Form.Label>
            <Col sm={10} className="form-radio">
              {USER_CONFLICT_REASONS.map((reason) => (
                <Form.Check
                  key={reason}
                  checked={inputs.category === reason}
                  id={reason}
                  label={firstLetterUpcase(reason)}
                  name="category"
                  onChange={handleChange}
                  type="radio"
                  value={reason}
                />
              ))}
            </Col>
          </Form.Group>
        </fieldset>
        <Button type="submit" variant="primary" block>
          Submit
        </Button>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Form>
      <hr />
    </Col>
  );
}

ConflictForm.propTypes = {
  conflict: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
