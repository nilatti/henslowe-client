import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import Datetime from "react-datetime"; //updated!

import { useConflicts } from "../Conflicts/ConflictStateProvider";
import { useForm } from "../../hooks/environmentUtils";
import { StartEndDateTimePair } from "../../utils/formUtils";
import { firstLetterUpcase } from "../../utils/stringUtils";

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
  const { parentType, parentId, conflictReasonsArray } = useConflicts();
  return (
    <Col
      md={{
        span: 8,
        offset: 2,
      }}
    >
      <Form noValidate onSubmit={(e) => handleSubmit(e)}>
        <StartEndDateTimePair
          endTime={inputs.end_time}
          startTime={inputs.start_time}
          handleChange={handleChange}
        />
        <fieldset>
          <Form.Group as={Form.Row}>
            <Form.Label as="legend">Category</Form.Label>
            <Col sm={10} className="form-radio">
              {conflictReasonsArray.map((reason) => (
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
