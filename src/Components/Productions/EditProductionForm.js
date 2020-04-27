import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class EditProductionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      end_date: this.props.production.end_date || '',
      lines_per_minute: this.props.production.lines_per_minute || '',
      play: this.props.production.play,
      start_date: this.props.production.start_date || '',
      theater: this.props.production.theater,
      validated: false,
    }
  }

  handleChange = (event) => {
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
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.production.id,
      lines_per_minute: this.state.lines_per_minute,
      end_date: this.state.end_date,
      start_date: this.state.start_date,
    }, "production")
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md = {{span: 8, offset: 2}}>
      <h2>{this.props.production.play.title} at {this.props.production.theater.name}</h2>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
        <Form.Group controlId="lines_per_minute">
          <Form.Label>
            Lines per minute
          </Form.Label>
          <Form.Control
            name="lines_per_minute"
            onChange={this.handleChange}
            placeholder=""
            type="number"
            value={this.state.lines_per_minute}
          >
          </Form.Control>
        </Form.Group>
          <Form.Group controlId="start_date">
            <Form.Label>
              Start Date
            </Form.Label>
            <Form.Control
                name="start_date"
                onChange={this.handleChange}
                placeholder=""
                type="date"
                value={this.state.start_date}
              />
          </Form.Group>
          <Form.Group controlId="end_date">
            <Form.Label>
              End Date
            </Form.Label>
            <Form.Control
                name="end_date"
                onChange={this.handleChange}
                placeholder=""
                type="date"
                min={this.state.start_date}
                value={this.state.end_date}
              />
              <Form.Control.Feedback type="invalid">
                End date must be after start date
              </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form> <hr />
      </Col>)
  }
}

EditProductionForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.object,
}

EditProductionForm.defaultProps = {
  production: {
    id: '',
    play: {
      id: '',
      title: '',
    },
    theater: {
      id: '',
      name: '',
    }

  }
}

export default EditProductionForm
