import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "../../../hooks/environmentUtils";
import { Button } from "../../Button";
import { Form, FormGroup } from "../../Form";
import { useProductionState } from "../../../lib/productionState";
import { StartEndDateTimePair } from "../../../utils/formUtils";
import { formatDateTimeForRails } from "../../../utils/dateTimeUtils";

const RehearsalFormStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`;

export default function RehearsalForm({
  onFormClose,
  onFormSubmit,
  rehearsal,
}) {
  const { inputs, handleChange } = useForm(
    rehearsal || {
      end_time: new Date(),
      notes: "",
      start_time: new Date(),
      title: "",
    }
  );

  const { productionId } = useProductionState();

  function processSubmit() {
    let id;
    if (rehearsal) {
      id = rehearsal.id;
    }
    onFormSubmit({
      id: id,
      end_time: formatDateTimeForRails(inputs.endTime),
      notes: inputs.notes,
      space_id: "",
      start_time: formatDateTimeForRails(inputs.startTime),
      title: inputs.title,
      production_id: productionId,
    });
  }

  function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      processSubmit();
      onFormClose();
    }
  }

  return (
    <RehearsalFormStyles>
      <h2>New Rehearsal</h2>
      <Form
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        // validated={validated}
      >
        <fieldset>
          <StartEndDateTimePair
            endTime={inputs.end_time}
            startTime={inputs.start_time}
            handleChange={handleChange}
          />
          <FormGroup>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="notes">Notes:</label>
            <input
              id="notes"
              as="textarea"
              name="notes"
              onChange={handleChange}
              rows="3"
              value={inputs.notes}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={onFormClose}>
            Cancel
          </Button>
        </fieldset>
      </Form>
      <hr />
    </RehearsalFormStyles>
  );
}

RehearsalForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  rehearsal: PropTypes.object,
};
