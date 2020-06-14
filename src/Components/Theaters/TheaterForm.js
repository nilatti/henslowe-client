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
import {TheaterAuthContext} from '../Contexts'

class TheaterForm extends Component {
  constructor(props) {
    super(props)
    if (this.props.theater) {
      this.state = {
        city: this.props.theater.city || '',
        mission_statement: this.props.theater.mission_statement || '',
        name: this.props.theater.name || '',
        phone_number: this.props.theater.phone_number || '',
        state: this.props.theater.state || '',
        street_address: this.props.theater.street_address || '',
        validated: false,
        website: this.props.theater.website || '',
        zip: this.props.theater.zip || '',
      }
    } else {
        this.state = {
          city: '',
        mission_statement: '',
        name: '',
        phone_number: '',
        state: '',
        street_address: '',
        validated: false,
        website: '',
        zip: '',
      }
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
      id: this.props.theater ? this.props.theater.id : '',
      mission_statement: this.state.mission_statement,
      name: this.state.name,
      phone_number: this.state.phone_number,
      state: this.state.state,
      street_address: this.state.street_address,
      website: this.state.website,
      zip: this.state.zip,
    }, "theater")
  }

  render() {

    const {
      validated
    } = this.state
    // update states to be all 50 with outside ref
    // figure out why text area is small for mission statement.
    return (
      <Col md = {
        {
          span: 8,
          offset: 2
        }
      } >
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
        </Form>
        <hr />
      </Col>
    )
  }
}

TheaterForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  city: PropTypes.string,
  id: PropTypes.number,
  mission_statement: PropTypes.string,
  name: PropTypes.string,
  phone_number: PropTypes.string,
  state: PropTypes.string,
  street_address: PropTypes.string,
  website: PropTypes.string,
  zip: PropTypes.string,
}

export default TheaterForm
