import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'
import {
  Typeahead
} from 'react-bootstrap-typeahead';

class NewCasting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: this.props.production.play.characters,
      end_date: this.props.production.end_date || '',
      production: this.props.production,
      specialization: 2,
      theater: this.props.production.theater,
      selectedCharacter: [],
      selectedUser: [],
      start_date: this.props.production.start_date || '',
      validated: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacter: [e[0]]
      })
    }
  }

  handleChangeUser = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedUser: [e[0]]
      })
    }
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
      character_id: this.state.selectedCharacter[0].id,
      end_date: this.state.end_date,
      production_id: this.state.production.id,
      start_date: this.state.start_date,
      specialization_id: this.state.specialization,
      theater_id: this.state.theater.id,
      user_id: this.state.selectedUser[0].id,
    }, "job")
  }

  render() {
    var characters = this.state.characters.map((character) => ({
      id: character.id,
      label: character.name
    }))
    const {
      validated
    } = this.state
    return (<Col md = {{span: 8, offset: 2}}>
      <Form
        noValidate
        onSubmit={e => this.handleSubmit(e)}
        validated={validated}
      >
      <Form.Group>
        <Form.Label>
          Actor
        </Form.Label>
        <Typeahead
          id="user"
          required
          options={this.props.users}
          onChange={(selected) => {
            this.handleChangeUser(selected)
          }}
          selected={this.state.selectedUser}
          placeholder="Choose the user"
        />
        <Form.Control.Feedback type="invalid">
            Actor is required
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Character/Role
        </Form.Label>
        <Typeahead
          allowNew
          id="character"
          required
          options={characters}
          onChange={(selected) => {
            this.handleChangeCharacter(selected)
          }}
          selected={this.state.selectedCharacter}
          placeholder="Choose character or role"
        />
        <Form.Control.Feedback type="invalid">
            Character/Role is required
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="primary" block>Submit</Button>
      <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
    </Form> <hr />
    </Col>)
  }
}

NewCasting.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
}

export default NewCasting
