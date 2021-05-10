import PropTypes from "prop-types";
import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "../../../hooks/environmentUtils";
import { useProductionState } from "../../../lib/productionState";
import { StartEndDateTimePair } from "../../../utils/formUtils";
import { formatDateTimeForRails } from "../../../utils/dateTimeUtils";

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
    <Col
      md={{
        span: 8,
        offset: 2,
      }}
    >
      <Form
        noValidate
        onSubmit={(e) => handleSubmit(e)}
        // validated={validated}
      >
        <StartEndDateTimePair
          endTime={inputs.end_time}
          startTime={inputs.start_time}
          handleChange={handleChange}
        />
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            name="title"
            onChange={handleChange}
            value={inputs.title}
          />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            onChange={handleChange}
            rows="3"
            value={inputs.notes}
          />
        </Form.Group>
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

RehearsalForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  rehearsal: PropTypes.object,
};
