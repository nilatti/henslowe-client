import PropTypes from "prop-types";
import React from "react";
import { Button } from "../Button.js";
import { Form, FormGroup } from "../Form.js";
import {
  FancyCheckBox,
  FancyCheckBoxLabel,
  FancyRadio,
  FancyRadioLabelBox,
} from "../Styled.js";
import { useConflicts } from "../../lib/conflictState.js";
import { useForm } from "../../hooks/environmentUtils.js";
import { StartEndDatePair, StartEndTimePair } from "../Inputs.js";
import { DAYS_OF_WEEK } from "../../utils/hardcodedConstants.js";
import { firstLetterUpcase } from "../../utils/stringUtils.js";

export default function ConflictPatternCreatorForm({ cancel, onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    category: "",
    end_date: "",
    end_time: "",
    start_date: "",
    start_time: "",
    days_of_week: [],
  });

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

  let weekDays = DAYS_OF_WEEK.map((day) => {
    return (
      <div key={day}>
        <FancyCheckBox htmlFor={day}>
          <FancyRadio
            type="checkbox"
            id={`${day}`}
            onChange={handleChange}
            name="days_of_week"
            value={day}
          />
          <FancyCheckBoxLabel>{firstLetterUpcase(day)}</FancyCheckBoxLabel>
        </FancyCheckBox>
      </div>
    );
  });

  const { parentType, parentId, conflictReasonsArray } = useConflicts();
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <label>I have a conflict every</label>
        {weekDays}
      </FormGroup>
      <StartEndTimePair
        endTime={inputs.end_time}
        handleChange={handleChange}
        startTime={inputs.start_time}
      />
      <StartEndDatePair
        endDate={inputs.end_date}
        handleChange={handleChange}
        startDate={inputs.start_date}
      />
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
