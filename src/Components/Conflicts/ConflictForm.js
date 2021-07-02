import PropTypes from "prop-types";
import React from "react";
// import { Button, Col, Form } from "react-bootstrap";
import Datetime from "react-datetime";
import { Button } from "../Button";
import { Form, FormGroup } from "../Form";
import { FancyRadio, FancyRadioLabelBox } from "../Styled";

import { useConflicts } from "../../lib/conflictState";
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
    event.preventDefault();

    processSubmit();
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
    onFormClose();
  }
  // const { validated } = this.state;
  const { parentType, parentId, conflictReasonsArray } = useConflicts();
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <StartEndDateTimePair
        endTime={inputs.end_time}
        startTime={inputs.start_time}
        handleChange={handleChange}
      />
      <fieldset>
        <FormGroup as={Form.Row}>
          <label as="legend">Category</label>
          {conflictReasonsArray.map((reason) => (
            <div className="category" key={reason}>
              <label>
                <FancyRadio
                  checked={inputs.category === reason}
                  id={reason}
                  label={reason}
                  name="category"
                  onChange={handleChange}
                  type="radio"
                  value={reason}
                />
                <FancyRadioLabelBox>
                  <span>{firstLetterUpcase(reason)}</span>
                </FancyRadioLabelBox>
              </label>
            </div>
          ))}
        </FormGroup>
      </fieldset>
      <Button type="submit" variant="primary" block>
        Submit
      </Button>
      <Button type="button" onClick={onFormClose} block>
        Cancel
      </Button>
    </Form>
  );
}

ConflictForm.propTypes = {
  conflict: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
