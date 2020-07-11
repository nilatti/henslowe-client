import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

import AddressForm from '../AddressForm'

class SpaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: this.props.space.city || '',
      mission_statement: this.props.space.mission_statement || '',
      name: this.props.space.name || '',
      phone_number: this.props.space.phone_number || '',
      state: this.props.space.state || '',
      street_address: this.props.space.street_address || '',
      validated: false,
      website: this.props.space.website || '',
      zip: this.props.space.zip || '',
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
      city: this.state.city,
      id: this.props.space.id,
      mission_statement: this.state.mission_statement,
      name: this.state.name,
      phone_number: this.state.phone_number,
      state: this.state.state,
      street_address: this.state.street_address,
      website: this.state.website,
      zip: this.state.zip,
    }, "space")
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
          <Form.Group controlId="name">
            <Form.Label>
              Name
            </Form.Label>
            <Form.Control
                type="text"
                placeholder="name"
                name="name"
                onChange={this.handleChange}
                required
                value={this.state.name}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="website">
            <Form.Label>
              Website
            </Form.Label>
              <Form.Control
                type="text"
                placeholder="website"
                name="website"
                value={this.state.website}
                onChange={this.handleChange}
              />
          </Form.Group>
          <AddressForm
            city={this.state.city}
            onChange={this.handleChange}
            state={this.state.state}
            street_address={this.state.street_address}
            zip={this.state.zip}
          />
          <Form.Group controlId="phoneNumber">
            <Form.Label>
              Phone Number
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="phone number"
              name="phone_number"
              value={this.state.phone_number}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="missionStatement">
            <Form.Label>
              Mission Statement
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="30"
              placeholder="mission statement"
              name="mission_statement"
              value={this.state.mission_statement}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Form> <hr />
      </Col>)
  }
}

SpaceForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  space: PropTypes.object,
}

SpaceForm.defaultProps = {
  space: {
    city: '',
    id: '',
    mission_statement: '',
    name: '',
    phone_number: '',
    state: '',
    street_address: '',
    website: '',
    zip: '',

  }
}

export default SpaceForm