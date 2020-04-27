import React, {Component} from 'react'
import {
  Button,
  Col,
  Form,
} from 'react-bootstrap'

class NewUserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      password: '',
      password_confirmation: '',
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
      event.preventDefault()
      this.processSubmit()
      this.props.handleClose()
    }
    this.setState({
      validated: true
    })
  }

  processSubmit = () => {
    this.props.onFormSubmit({
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      middle_name: this.state.middle_name,
      password: this.state.password,
      password_confirmation: this.state.password,
    }, "user")
  }
  render () {
    let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    const {
        validated
    } = this.state
    return (
      <div className={showHideClassName}>
      <section className="new-user-modal">
          <Col md={ {
            span: 8,
            offset: 2
          } }>
          <Form
          noValidate
          onSubmit={e => this.handleSubmit(e)}
          validated={validated}
          >
          <Form.Group controlId="first_name">
          <Form.Label>
          First Name
          </Form.Label>
          <Form.Control
          name="first_name"
          onChange={this.handleChange}
          placeholder="First Name"
          required
          type="text"
          value={this.state.first_name}
          />
          <Form.Control.Feedback type="invalid">
          First Name is required
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="middle_name">
          <Form.Label>
          Middle Name
          </Form.Label>
          <Form.Control
          name="middle_name"
          onChange={this.handleChange}
          placeholder="Middle Name"
          type="text"
          value={this.state.middle_name}
          />
          </Form.Group>
          <Form.Group controlId="last_name">
          <Form.Label>
          Last Name
          </Form.Label>
          <Form.Control
          name="last_name"
          onChange={this.handleChange}
          placeholder="Last Name"
          required
          type="text"
          value={this.state.last_name}
          />
          <Form.Control.Feedback type="invalid">
          Last Name is required
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
          <Form.Label>
          Email
          </Form.Label>
          <Form.Control
          name="email"
          onChange={this.handleChange}
          placeholder="email"
          required
          type="email"
          value={this.state.email}
          />
          <Form.Control.Feedback type="invalid">
          Email is required
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
          <Form.Label>
          Password
          </Form.Label>
          <Form.Control
          name="password"
          onChange={this.handleChange}
          placeholder="password"
          type="password"
          value={this.state.password}
          />
          </Form.Group>
          <Form.Group controlId="password_confirmation">
          <Form.Label>
          Confirm Password
          </Form.Label>
          <Form.Control
          name="password_confirmation"
          onChange={this.handleChange}
          placeholder="confirm password"
          type="password"
          value={this.state.password_confirmation}
          />
          <Form.Control.Feedback type="invalid">
          Passwords must match and are required
          </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" block>Submit</Button>
          <Button type="button" onClick={this.props.handleClose} block>Cancel</Button>
          </Form>
          <hr />
          </Col>
          </section>
          </div>
        )
      }
};

export default NewUserModal
