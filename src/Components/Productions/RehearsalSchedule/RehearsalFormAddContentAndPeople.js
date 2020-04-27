import moment from 'moment'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'
import Moment from 'react-moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
moment.locale('en')
momentLocalizer()

class RehearsalFormAddContentAndPeople extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleTextUnitChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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

  loadOnStages = (e) => {
    e.preventDefault()
    if (this.state.textUnit === 'french_scene') {
      console.log('load french scenes')
    } else if (this.state.textUnit === 'scene') {
      console.log('load scenes')
    } else if (this.state.textUnit === 'act') {
      console.log('load act')
    } else {
      console.log('load play')
    }
  }

  processSubmit = () => {
    let id
    if (this.props.rehearsal) {
      id = this.props.rehearsal.id
    }
    this.props.onFormSubmit({
      id: id,
      end_time: this.state.endTime,
      notes: this.state.notes,
      space_id: '',
      start_time: this.state.startTime,
      title: this.state.title,
      production_id: this.props.productionId,
    }, "rehearsal")
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md={ {
          span: 8,
          offset: 2
        } }>
      <h2>How do you want to schedule this rehearsal?</h2>
      <Form
        onSubmit={e => this.loadOnStages(e)}
      >
      <Form.Group as={Form.Row}>
        <Form.Label as="legend">
          Unit of text
        </Form.Label>
        <Col sm={10} className="form-radio">
          <Form.Check
            checked={this.state.textUnit === 'french_scene'}
            id="french_scene"
            label="French Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="french_scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'scene'}
            id="scene"
            label="Scene"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="scene"
          />
          <Form.Check
            checked={this.state.textUnit === 'act'}
            id="act"
            label="Act"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="act"
          />
          <Form.Check
            checked={this.state.textUnit === 'play'}
            id="play"
            label="Whole Play"
            name="textUnit"
            onChange={this.handleChange}
            type="radio"
            value="play"
          />
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" block>Load Text Options</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Col>
    )
  }
}

RehearsalFormAddContentAndPeople.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.string.isRequired,
}

export default RehearsalFormAddContentAndPeople
