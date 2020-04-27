import React, {
  useState,
} from 'react'
import {
  Button,
  Col,
  Form,
  InputGroup
} from 'react-bootstrap'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {buildRehearsalSchedule} from '../../../api/productions.js'

moment.locale('en')
momentLocalizer()

export default function RehearsalPatternCreator({production, cancel}) {
  const [blockLength, setBlockLength] = useState('')
  const [breakLength, setBreakLength] = useState('')
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [timeBetweenBreaks, setTimeBetweenBreaks] = useState([])
  const [validated, setValidated] = useState(false)

  function handleChange(setFunction, event) {
    setFunction(event.target.value)
  }

  function handleChangeCheckbox (event) {
    let day = event.target.id
    if (event.target.checked) {
      setDaysOfWeek(days => [...days, day])
    } else {
      setDaysOfWeek(daysOfWeek.filter((origDay) => origDay !== day))
    }
  }
  function handleDateTimeChange(setFunction, event) {
    setFunction(event)
  }

  function handleSubmit(event) {
    event.preventDefault()
    let rehearsalSchedulePattern = {
      id: production.id,
      rehearsal_schedule_pattern: {
        block_length: blockLength,
        break_length: breakLength,
        days_of_week: daysOfWeek,
        end_date: moment(endDate).format('YYYY-MM-DD'),
        end_time: moment(endTime).format('HH:mmZZ'),
        time_between_breaks: timeBetweenBreaks,
        start_date: moment(startDate).format('YYYY-MM-DD'),
        start_time: moment(startTime).format('HH:mmZZ'),
      }
    }
    console.log('patter obj', rehearsalSchedulePattern)
    createRehearsalSchedulePattern(production.id, rehearsalSchedulePattern)
  }
  async function createRehearsalSchedulePattern(productionId, rehearsalSchedulePattern) {
    let response = await buildRehearsalSchedule(productionId, rehearsalSchedulePattern)
    console.log(response)
  }
  return (
    <Col md={ {
        span: 8,
        offset: 2
      } }>
      <p>
      Rehearsal patterns are just patterns that feed into our rehearsal generator. If you have multiple rehearsal patterns, you will need to run this generator a few times.
      </p>
      <p>
        For example: A production begins rehearsal on 3/1/2020. Tech week begins 4/5/2020. The show opens on 4/10/2020. During normal weeks, the company rehearses Sundays from 5:30-9:30, and Monday through Thursday 6:30-10:30. During tech week, the company rehearses every day from 4-11.
      </p>
      <p>
        The stage manager would need to make the following different rehearsal patterns (doing this form three times):
      </p>
        <ul>
          <li>3/1/2020 to 4/4/2020, Sunday, 5:30-9:30</li>
          <li>3/1/2020 to 4/4/2020, Monday, Tuesday, Wednesday, Thursday, 6:30-10:30</li>
          <li>4/5/2020-4/10/2020, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, 4-11</li>
        </ul>
    <Form
      noValidate
      onSubmit={handleSubmit}
      validated={validated}
    >
    <Form.Group controlId="start_date">
      <Form.Label>
        From
      </Form.Label>
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
      <Form.Label>
        To
      </Form.Label>
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
    <Form.Group>
    <Form.Label>We rehearse every</Form.Label>
    <Form.Check
      id='monday'
      label='Monday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='tuesday'
      label='Tuesday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='wednesday'
      label='Wednesday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='thursday'
      label='Thursday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='friday'
      label='Friday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='saturday'
      label='Saturday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    <Form.Check
      id='sunday'
      label='Sunday'
      name='daysOfWeek'
      type='checkbox'
      onChange={handleChangeCheckbox}
      type="checkbox"
    />
    </Form.Group>

    <Form.Group controlId="start_time">
      <Form.Label>
        Starting at...
      </Form.Label>
      <DateTimePicker
        date={false}
        format={"hh:mm A"}
        onChange={(e) => handleDateTimeChange(setStartTime, e)}
        required
        value={startTime}
      />
    </Form.Group>
    <Form.Group controlId="end_time">
      <Form.Label>
        and ending at...
      </Form.Label>
      <DateTimePicker
        required
        date={false}
        defaultValue={startTime}
        format={"hh:mm A"}
        min={startTime}
        onChange={(e) => handleDateTimeChange(setEndTime, e)}
        value={endTime}
      />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group>
      <Form.Label>
        Length of blocks for scheduling rehearsal
      </Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="length of rehearsal blocks"
          onChange={(e) => handleChange(setBlockLength, e)}
          value={blockLength}
        />
        <InputGroup.Append>
          <InputGroup.Text
            id="blockLength"
            type="number"

            >minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
    <Form.Group>
      <Form.Label>
        Length of breaks
      </Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="length of breaks"
          onChange={(e) => handleChange(setBreakLength, e)}
          value={breakLength}
        />
        <InputGroup.Append>
          <InputGroup.Text
            id="blockLength"
            type="number"

            >minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
    <Form.Group>
      <Form.Label>
        Time between the end of one break and the beginning of the next.
      </Form.Label>
      <InputGroup>
        <Form.Control
          placeholder="length work time between blocks"
          onChange={(e) => handleChange(setTimeBetweenBreaks, e)}
          value={timeBetweenBreaks}
        />
        <InputGroup.Append>
          <InputGroup.Text
            id="blockLength"
            type="number"
            >minutes</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
    <Button type="submit" variant="primary" block>Submit</Button>
    <Button type="button" onClick={() => cancel(false)} block>Cancel</Button>
    </Form>
      <hr />
    </Col>
  )
}
