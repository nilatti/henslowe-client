import moment from "moment";
import momentLocalizer from "react-widgets-moment";
import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { DAYS_OF_WEEK } from "../../utils/hardcodedConstants";
import { firstLetterUpcase } from "../../utils/stringUtils";
import { useForm } from "../../utils/environmentUtils";
moment.locale("en");
momentLocalizer();

export default function ConflictPatternCreatorForm({
  cancel,
  conflictReasonsArray,
  submitHandler,
}) {
  const { parentType, parentId } = useConflicts();
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [validated, setValidated] = useState(false);
  const [category, setCategory] = useState();

  // const { inputs, handleChange, clearForm, resetForm } = useForm(
  //   data?.Product || {
  //     name: '',
  //     description: '',
  //     price: '',
  //   }
  // );

  // function handleChange(setFunction, event) {
  //   setFunction(event.target.value);
  // }

  function handleChangeCheckbox(event) {
    let day = event.target.id;
    if (event.target.checked) {
      setDaysOfWeek((days) => [...days, day]);
    } else {
      setDaysOfWeek(daysOfWeek.filter((origDay) => origDay !== day));
    }
  }
  function handleDateTimeChange(setFunction, event) {
    setFunction(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let conflictSchedulePattern = {
      id: parentId,
      conflict_schedule_pattern: {
        category: category,
        days_of_week: daysOfWeek,
        end_date: endDate && moment(endDate).format("YYYY-MM-DD"),
        end_time: moment(endTime).format("HH:mmZZ"),
        start_date: startDate && moment(startDate).format("YYYY-MM-DD"),
        start_time: moment(startTime).format("HH:mmZZ"),
      },
    };
    submitHandler(parentId, conflictSchedulePattern);
    cancel();
  }
  return (
    <Form noValidate onSubmit={handleSubmit} validated={validated}>
      <Form.Group>
        <Form.Label>I have a conflict every</Form.Label>
        {DAYS_OF_WEEK.map((day) => (
          <Form.Check
            id={day}
            key={day}
            label={firstLetterUpcase(day)}
            name="daysOfWeek"
            type="checkbox"
            onChange={handleChangeCheckbox}
            type="checkbox"
          />
        ))}
      </Form.Group>
      <Form.Group controlId="start_time">
        <Form.Label>Starting at...</Form.Label>
        <DateTimePicker
          date={false}
          format={"hh:mm A"}
          onChange={(e) => handleDateTimeChange(setStartTime, e)}
          required
          value={startTime}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>and ending at...</Form.Label>
        <DateTimePicker
          required
          date={false}
          defaultValue={startTime}
          format={"hh:mm A"}
          min={startTime}
          onChange={(e) => handleDateTimeChange(setEndTime, e)}
          value={endTime}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label>From</Form.Label>
        <DateTimePicker
          time={false}
          required
          format={"MM/DD/YYYY"}
          onChange={(e) => handleDateTimeChange(setStartDate, e)}
          required
          value={startDate}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>To</Form.Label>
        <DateTimePicker
          required
          time={false}
          defaultValue={startDate}
          format={"MM/DD/YYYY"}
          min={startTime}
          onChange={(e) => handleDateTimeChange(setEndDate, e)}
          value={endDate}
        />
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">Category</Form.Label>
        <Col sm={10} className="form-radio">
          {conflictReasonsArray.map((reason) => (
            <Form.Check
              key={reason}
              checked={category === reason}
              id={reason}
              label={firstLetterUpcase(reason)}
              name="category"
              onChange={(e) => handleChange(setCategory, e)}
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
