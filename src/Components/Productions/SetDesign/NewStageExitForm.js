import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Button,
  Form,
} from 'react-bootstrap'

class NewStageExitForm extends Component {
  state={
    validated: false,
    name: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
      name: this.state.name,
      production_id: this.props.productionId
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <div>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group controlId="end_date">
        <Form.Label>
          Name
        </Form.Label>
        <Form.Control
            name="name"
            onChange={this.handleChange}
            placeholder=""
            required
            type="text"
          />
          <Form.Control.Feedback type="invalid">
            Name is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary" block>Submit</Button>
        <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
      </Form>
      </div>
    )
  }
}

NewStageExitForm.propTypes = {
  productionId: PropTypes.number.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewStageExitForm
