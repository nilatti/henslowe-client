import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class SpecializationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: this.props.specialization.description,
      title: this.props.specialization.title,
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
      description: this.state.description,
      id: this.props.specialization.id,
      title: this.state.title,
    }, "specialization")
  }

  render() {
    const {
      validated
    } = this.state
    return (<Col md = {{span: 8, offset: 2}}>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
          <Form.Group controlId="title">
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="title"
                name="title"
                onChange={this.handleChange}
                required
                value={this.state.title}
              />
              <Form.Control.Feedback type="invalid">
                Title is required
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form> <hr />
      </Col>)
  }
}

SpecializationForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  specialization: PropTypes.object,
}

SpecializationForm.defaultProps = {
  specialization: {
    description: '',
    id: '',
    title: '',
  }
}

export default SpecializationForm
