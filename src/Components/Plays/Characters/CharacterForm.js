import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age: this.props.character.age,
      description: this.props.character.description,
      gender: this.props.character.gender,
      name: this.props.character.name,
      play_id: this.props.play_id,
      validated: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
      age: this.state.age,
      description: this.state.description,
      gender: this.state.gender,
      id: this.props.character.id,
      name: this.state.name,
      play_id: this.props.play_id,
    })
  }

  render() {
    const {
      validated
    } = this.state
    return (
      <Col md={{ span: 8, offset: 2 }}>
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
              name="name"
              onChange={this.handleChange}
              placeholder="name"
              required
              type="text"
              value={this.state.name}
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="gender">
            <Form.Label>
              Gender
            </Form.Label>
            <Form.Control
              as="select"
              name="gender"
              onChange={this.handleChange}
              value={this.state.gender}
            >
              <option></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="neutral">Neutral</option>
              <option value="nonbinary">Nonbinary/other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>
              Age
            </Form.Label>
            <Form.Control
              as="select"
              name="age"
              onChange={this.handleChange}
              value={this.state.age}
            >
              <option></option>
              <option value="baby">Baby</option>
              <option value="child">Child</option>
              <option value="teenager">Teenager</option>
              <option value="young adult">Young Adult</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={this.handleChange}
              placeholder="description"
              rows="10"
              value={this.state.description}
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

CharacterForm.defaultProps = {
  character: {
    age: '',
    description: '',
    gender: '',
    name: '',
  }
}

CharacterForm.propTypes = {
  character: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play_id: PropTypes.number.isRequired,
}

export default CharacterForm
