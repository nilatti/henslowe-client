import moment from 'moment'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
moment.locale('en')
momentLocalizer()
// const validate = ({ startTime, endTime }) => {
//   return {
//     endTime:
//       endTime < startTime
//         ? "Start time must be after end time."
//         : false
//   };
// };

class ConflictForm extends Component {
  constructor(props) {
    super(props)
    let category = ''
    let endTime = ''
    let startTime = ''
    if (this.props.conflict) {
      category =  this.props.conflict.category
      endTime =  this.props.conflict.end_time
      startTime = this.props.conflict.start_time
    }
    this.state = {
      category: category,
      endTime: endTime,
      startTime: startTime,

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEndTimeChange = (event) => {
    this.setState({
      endTime: moment(event).format()
    })
  }

  handleStartTimeChange = (event) => {
    this.setState({
      startTime: moment(event).format()
    })
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit()
      this.props.onFormClose()
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    let id
    if (this.props.conflict) {
      id = this.props.conflict.id
    }
    this.props.onFormSubmit({
      id: id,
      category: this.state.category,
      end_time: this.state.endTime,
      space_id: '',
      start_time: this.state.startTime,
      user_id: this.props.user.id,
    }, "conflict")
  }

  render() {
    let startTime
    if (this.state.startTime) {
      startTime = new Date(this.state.startTime)
    } else {
      startTime = new Date()
    }
    let endTime
    if (this.state.endTime) {
      endTime = new Date(this.state.endTime)
    } else {
      endTime = new Date()
    }
    const {
      validated
    } = this.state
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group controlId="start_time">
        <Form.Label>
          Start Time
        </Form.Label>
        <DateTimePicker
          format={"MM/DD/YYYY hh:mm A"}
          onChange={this.handleStartTimeChange}
          value={startTime}
        />
      </Form.Group>
      <Form.Group controlId="end_time">
        <Form.Label>
          End Time
        </Form.Label>
        <DateTimePicker
          defaultValue={startTime}
          format={"MM/DD/YYYY hh:mm A"}
          min={startTime}
          onChange={this.handleEndTimeChange}
          value={endTime}
        />
        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>
      </Form.Group>
        <fieldset>
    <Form.Group as={Form.Row}>
      <Form.Label as="legend">
        Category
      </Form.Label>
      <Col sm={10} className="form-radio">
        <Form.Check
          checked={this.state.category === 'rehearsal'}
          id="rehearsal"
          label="Rehearsal"
          name="category"
          onChange={this.handleChange}
          type="radio"
          value="rehearsal"
        />
        <Form.Check
          checked={this.state.category === 'work'}
          id="work"
          label="Work"
          name="category"
          onChange={this.handleChange}
          type="radio"
          value="work"
        />
        <Form.Check
          checked={this.state.category === 'class'}
          id="class"
          label="Class"
          name="category"
          onChange={this.handleChange}
          type="radio"
          value="class"
        />
        <Form.Check
          checked={this.state.category === 'personal'}
          id="personal"
          label="Personal"
          name="category"
          onChange={this.handleChange}
          type="radio"
          value="personal"
        />
        <Form.Check
          checked={this.state.category === 'medical'}
          id="medical"
          label="Medical"
          name="category"
          onChange={this.handleChange}
          type="radio"
          value="medical"
        />
      </Col>
    </Form.Group>
  </fieldset>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
      </Form>
        <hr />
      </Col>
    )
  }
}

ConflictForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ConflictForm
