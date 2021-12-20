import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "../../../hooks/environmentUtils";
import { Button } from "../../Button";
import { Form, FormGroup } from "../../Form";
import { useProductionState } from "../../../lib/productionState";
import { StartEndDateTimePair } from "../../Inputs";
import { formatDateTimeForRails } from "../../../utils/dateTimeUtils";
import { useMeState } from "../../../lib/meState";

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
  const { me } = useMeState();
  const { inputs, handleChange } = useForm({
    end_time: rehearsal?.end_time || new Date(),
    notes: rehearsal?.notes || "",
    start_time: rehearsal?.start_time || new Date(),
    title: rehearsal?.title || "",
  });

  const { productionId } = useProductionState();

  function processSubmit() {
    let id;
    if (rehearsal) {
      id = rehearsal.id;
    }
    onFormSubmit({
      id: id,
      end_time: formatDateTimeForRails({
        datetime: inputs.endTime,
        timezone: me.timezone,
      }),
      notes: inputs.notes,
      space_id: "",
      start_time: formatDateTimeForRails({
        datetime: inputs.startTime,
        timezone: me.timezone,
      }),
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
      <Form
        width="85%"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        // validated={validated}
      >
        <StartEndDateTimePair
          endTime={inputs.end_time}
          startTime={inputs.start_time}
          handleChange={handleChange}
          timezone={me.timezone}
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
      </Form>
      <hr />
    </RehearsalFormStyles>
  );
}

RehearsalForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  rehearsal: PropTypes.object,
};
