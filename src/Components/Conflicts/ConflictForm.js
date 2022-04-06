import PropTypes from "prop-types";
import React from "react";
// import { Button, Col, Form } from "react-bootstrap";
import Datetime from "react-datetime";
import { Button } from "../Button";
import { Form, FormGroup } from "../Form";
import { FancyRadio, FancyRadioLabelBox } from "../Styled";

import { useConflicts } from "../../lib/conflictState";
import { useMeState } from "../../lib/meState";
import { useForm } from "../../hooks/environmentUtils";
import { StartEndDateTimePair } from "../Inputs";
import { firstLetterUpcase } from "../../utils/stringUtils";
import { formatDateTimeForRails } from "../../utils/dateTimeUtils";

// const validate = ({ startTime, endTime }) => {
//   return {
//     endTime:
//       endTime < startTime
//         ? "Start time must be after end time."
//         : false
//   };
// };

export default function ConflictForm({ conflict, onFormClose, onFormSubmit }) {
  const { me } = useMeState();
  const { inputs, handleChange } = useForm({
    category: conflict?.category || "",
    end_time: new Date(conflict?.end_time) || new Date(),
    start_time: new Date(conflict?.start_time) || new Date(),
  });

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
    let formattedEndTime = formatDateTimeForRails({
      datetime: inputs.end_time,
    });
    let formattedStartTime = formatDateTimeForRails({
      datetime: inputs.start_time,
    });
    onFormSubmit(
      {
        id: id,
        category: inputs.category,
        end_time: formattedEndTime,
        start_time: formattedStartTime,
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
        handleChange={handleChange}
        startTime={inputs.start_time}
        timezone={me.timezone}
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
