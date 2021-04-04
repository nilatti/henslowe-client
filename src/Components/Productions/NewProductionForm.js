import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import { getTheaterNames } from "../../api/theaters";

import { getPlayTitles } from "../../api/plays";

import { useQuery } from "../../utils/environmentUtils";
class NewProductionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end_date: "",
      selectedPlay: [],
      plays: [],
      start_date: "",
      selectedTheater: [],
      theaters: [],
      validated: false,
    };
  }

  componentDidMount = () => {
    this.loadTheatersFromServer();
    this.loadPlaysFromServer();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeTheater = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedTheater: [e[0]],
      });
    }
  };

  handleChangePlay = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedPlay: [e[0]],
      });
    }
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
        id: this.props.production.id,
        end_date: this.state.end_date,
        play_id: this.state.selectedPlay[0].id,
        start_date: this.state.start_date,
        theater_id: this.state.selectedTheater[0].id,
      },
      "production"
    );
  };

  async loadPlaysFromServer() {
    const response = await getPlayTitles();
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching plays",
      });
    } else {
      this.setState({
        plays: response.data,
      });
    }
  }

  async loadTheatersFromServer() {
    const response = await getTheaterNames();
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching theaters",
      });
    } else {
      this.setState({
        theaters: response.data,
      });
    }
  }

  render() {
    var theaters = this.state.theaters.map((theater) => ({
      id: theater.id,
      label: String(theater.name),
    }));

    var plays = this.state.plays.map((play) => ({
      id: play.id,
      label: String(play.title),
    }));
    const { validated } = this.state;
    if (!this.state.theaters) {
      return <div>Loading theaters</div>;
    }

    if (!this.state.plays) {
      return <div>Loading plays</div>;
    }

    let query = useQuery();
    let theaterId = query.get("theaterId");
    console.log(theaterId);

    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={(e) => this.handleSubmit(e)}
          validated={validated}
        >
          <Form.Group>
            <Typeahead
              value={this.state.play_title}
              id="play"
              options={plays}
              onChange={(selected) => {
                this.handleChangePlay(selected);
              }}
              placeholder="Choose the play"
              selected={this.state.selectedPlay}
            />
            <Form.Control.Feedback type="invalid">
              Play is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Typeahead
              id="theater"
              options={theaters}
              onChange={(selected) => {
                this.handleChangeTheater(selected);
              }}
              selected={this.state.selectedTheater}
              placeholder="Choose the theater"
            />
            <Form.Control.Feedback type="invalid">
              Theater is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="start_date">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="start_date"
              onChange={this.handleChange}
              placeholder=""
              type="date"
              value={this.state.start_date}
            />
          </Form.Group>
          <Form.Group controlId="end_date">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              min={this.state.start_date}
              name="end_date"
              onChange={this.handleChange}
              placeholder=""
              type="date"
              value={this.state.end_date}
            />
          </Form.Group>
          <Button type="submit" variant="primary" block>
            Submit
          </Button>
          <Button type="button" onClick={this.props.onFormClose} block>
            Cancel
          </Button>
        </Form>{" "}
        <hr />
      </Col>
    );
  }
}

NewProductionForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.object,
};

NewProductionForm.defaultProps = {
  production: {
    id: "",
    play: {
      id: "",
      title: "",
    },
    theater: {
      id: "",
      name: "",
    },
  },
};

export default NewProductionForm;
