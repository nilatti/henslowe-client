import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-select/dist/react-select.css";

import { getAuthors } from "../../api/authors";

class PlayForm extends Component {
  constructor(props) {
    super(props);
    let props_date;
    moment(this.props.play.date).isValid()
      ? (props_date = moment(this.props.play.date))
      : (props_date = moment());
    this.state = {
      author_id: this.props.play.author.id || this.props.author_id,
      author_name:
        this.props.play.author.first_name +
        " " +
        this.props.play.author.last_name,
      authors: null,
      canonical: this.props.play.canonical || false,
      date: props_date,
      genre: this.props.play.genre || [],
      synopsis: this.props.play.synopsis || "",
      textNotes: this.props.play.text_notes || "",
      title: this.props.play.title || "",
      validated: false,
    };
  }

  componentDidMount = () => {
    this.loadAuthorsFromServer();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.authors === null) {
      this.loadAuthorsFromServer();
    }
  }

  handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeCheckbox = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleAuthorChange = (e) => {
    if (e.length > 0) {
      this.setState({
        author_id: e[0].id,
        author_name: e[0].label,
      });
    }
  };

  handleDateChange = (date) => {
    this.setState({
      date: date,
    });
  };

  handleGenreChange = (e) => {
    if (e.length > 0) {
      this.setState({
        genre: e.map((item) => item.id),
      });
    }
  };

  handleSubmit = (event) => {
    e.preventDefault;
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
    this.props.onFormSubmit({
      author_id: this.state.author_id,
      canonical: this.state.canonical,
      date: this.state.date,
      genre: this.state.genre,
      synopsis: this.state.synopsis,
      text_notes: this.state.textNotes,
      title: this.state.title,
      id: this.props.play.id,
    });
  };

  async loadAuthorsFromServer() {
    const response = await getAuthors();
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching authors",
      });
    } else {
      this.setState({
        authors: response.data,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        authors: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  render() {
    const genres = [
      { id: "comedy", label: "Comedy" },
      { id: "fringe", label: "Fringe" },
      { id: "history", label: "History" },
      { id: "musical", label: "Musical" },
      { id: "romance", label: "Romance" },
      { id: "solo", label: "Solo" },
      { id: "tragedy", label: "Tragedy" },
    ];

    const selected_genres = this.state.genre.map((genre) => ({
      id: genre,
      label: genre.charAt(0).toUpperCase() + genre.slice(1),
    }));
    const { validated } = this.state;
    if (!this.state.authors) {
      return <div>Loading authors</div>;
    }

    var authors = this.state.authors.map((author) => ({
      id: author.id,
      label: `${author.first_name} ${author.last_name}`,
    }));
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={(e) => this.handleSubmit(e)}
          validated={validated}
        >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
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
          {!this.props.isOnAuthorPage ? (
            <Form.Group>
              <Form.Label>Author:</Form.Label>
              <Typeahead
                allowNew
                newSelectionPrefix="Add a new item: "
                id="author"
                onChange={(selected) => {
                  this.handleAuthorChange(selected);
                }}
                options={authors}
                placeholder="Choose author..."
                defaultSelected={[this.state.author_name]}
              />
            </Form.Group>
          ) : (
            <br />
          )}
          <Form.Group controlId="canonical">
            <Form.Check
              id="canonical"
              name="canonical"
              label="Canonical?"
              checked={this.state.canonical}
              onChange={this.handleChangeCheckbox}
              type="checkbox"
            />
          </Form.Group>
          <Form.Group controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Typeahead
              allowNew
              id="genre"
              multiple={true}
              newSelectionPrefix="Add a new item: "
              options={genres}
              onChange={(selected) => {
                this.handleGenreChange(selected);
              }}
              placeholder="Choose genres..."
              defaultSelected={selected_genres}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Publication or first performance date</Form.Label>
            <br />
            <DatePicker
              className="form-control"
              name="date"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </Form.Group>
          <Form.Group controlId="text-notes">
            <Form.Label>Text Notes:</Form.Label>
            <Form.Control
              as="textarea"
              name="textNotes"
              onChange={this.handleChange}
              rows="3"
              value={this.state.textNotes}
            />
          </Form.Group>
          <Form.Group controlId="synopsis">
            <Form.Label>Synopsis:</Form.Label>
            <Form.Control
              as="textarea"
              name="synopsis"
              onChange={this.handleChange}
              rows="3"
              value={this.state.synopsis}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            type="button"
            variant="outline-primary"
            onClick={this.props.onFormClose}
          >
            Cancel
          </Button>
        </Form>
        <hr />
      </Col>
    );
  }
}

PlayForm.defaultProps = {
  play: {
    author: {
      first_name: "",
      last_name: "",
    },
    date: "01/01/2020",
    genre: "",
    title: "",
  },
};

PlayForm.propTypes = {
  isOnAuthorPage: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object,
};

export default PlayForm;
