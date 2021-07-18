import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: moment(this.props.author.birthdate),
      deathdate: moment(this.props.author.birthdate),
      deathDateVisible: this.props.author.deathdate ? true : false,
      first_name: this.props.author.first_name || "",
      gender: this.props.author.gender || "",
      last_name: this.props.author.last_name || "",
      middle_name: this.props.author.middle_name || "",
      nationality: this.props.author.nationality || "",
      plays: this.props.author.plays,
      validated: false,
    };
  }

  addDeathDate = () => {
    this.setState({
      deathDateVisible: true,
    });
  };
  handleBirthdateChange = (date) => {
    this.setState({
      birthdate: date,
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleDeathdateChange = (date) => {
    this.setState({
      deathdate: date,
    });
  };

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit();
    }
    this.setState({
      validated: true,
    });
  };

  processSubmit = () => {
    this.props.onFormSubmit(
      {
        id: this.props.author.id,
        first_name: this.state.first_name,
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        birthdate: this.state.birthdate,
        deathdate: this.state.deathdate,
        nationality: this.state.nationality,
        gender: this.state.gender,
        plays: this.state.plays,
      },
      "author"
    );
  };

  render() {
    const { validated } = this.state;
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={(e) => this.handleSubmit(e)}
          validated={validated}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="first name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="middleName">
              <Form.Label>Middle Name (opt)</Form.Label>
              <Form.Control
                type="text"
                placeholder="middle name"
                name="middle_name"
                value={this.state.middle_name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="last name"
                name="last_name"
                onChange={this.handleChange}
                required
                value={this.state.last_name}
              />
              <Form.Control.Feedback type="invalid">
                Last name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="nonbinary">nonbinary</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="nationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="nationality"
                name="nationality"
                value={this.state.nationality}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="birthdate">
              <Form.Label>Birthdate</Form.Label>
              <DatePicker
                name="birthdate"
                selected={this.state.birthdate}
                onChange={this.handleBirthdateChange}
              />
            </Form.Group>
            {this.state.deathDateVisible ? (
              <Form.Group as={Col} controlId="deathdate">
                <Form.Label>Deathdate</Form.Label>
                <DatePicker
                  name="deathdate"
                  selected={this.state.deathdate}
                  onChange={this.handleDeathdateChange}
                />
              </Form.Group>
            ) : (
              <Col md={2}>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => this.addDeathDate()}
                >
                  Click to add Death date
                </Button>
              </Col>
            )}
          </Form.Row>
          <Button type="submit" variant="primary" block>
            Submit
          </Button>
          <Button type="button" onClick={this.props.onFormClose} block>
            Cancel
          </Button>
        </Form>
        <hr />
      </Col>
    );
  }
}

AuthorForm.defaultProps = {
  author: {
    birthdate: moment(),
    id: "",
    first_name: "",
    gender: "",
    last_name: "",
    middle_name: "",
    nationality: "",
    plays: [],
  },
};

AuthorForm.propTypes = {
  author: PropTypes.object,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default AuthorForm;
