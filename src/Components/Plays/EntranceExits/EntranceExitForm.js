import PropTypes from "prop-types";

import React, { Component } from "react";

import { Button, Col, Form } from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";

import CharactersSelect from "../../../../Characters/CharactersSelect";

class NewEntranceExitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: this.props.characters,
      line: "",
      page: "",
      notes: "",
      selectedCharacters: [],
      selectedStageExit: [],
      stageExits: this.props.stageExits,
      validated: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacters: e,
      });
    }
  };

  handleChangeStageExit = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedStageExit: [e[0]],
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.processSubmit();
      this.props.onFormClose();
    }
    this.setState({
      validated: true,
    });
  };

  processSubmit = () => {
    var entranceExitToSubmit = {
      entrance_exit: {
        category: this.state.category,
        character_ids: this.state.selectedCharacters.map(
          (character) => character.id
        ),
        french_scene_id: this.props.frenchSceneId,
        line: this.state.line,
        page: this.state.page,
        notes: this.state.notes,
        stage_exit_id: this.state.selectedStageExit[0].id,
      },
    };
    this.props.onFormSubmit(
      this.props.actId,
      this.props.sceneId,
      this.props.frenchSceneId,
      entranceExitToSubmit
    );
  };

  render() {
    const { validated } = this.state;
    var characters = this.state.characters.map((character) => ({
      id: character.id,
      label: String(character.name),
    }));
    var stageExits = this.state.stageExits.map((stageExit) => ({
      id: stageExit.id,
      label: String(stageExit.name),
    }));
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Form
          noValidate
          onSubmit={(e) => this.handleSubmit(e)}
          validated={validated}
        >
          <Form.Group>
            <Form.Label>Stage exit</Form.Label>
            <Typeahead
              id="stage_exit"
              required
              options={stageExits}
              onChange={(selected) => {
                this.handleChangeStageExit(selected);
              }}
              selected={this.state.selectedStageExit}
              placeholder="Choose the exit"
            />
            <Form.Control.Feedback type="invalid">
              Stage exit is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Characters</Form.Label>
            <Typeahead
              id="characters"
              multiple
              required
              options={characters}
              onChange={(selected) => {
                this.handleChangeCharacter(selected);
              }}
              selected={this.state.selectedCharacters}
              placeholder="Choose the characters"
            />
            <Form.Control.Feedback type="invalid">
              Character is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Line number</Form.Label>
            <Form.Control
              id="line"
              type="number"
              name="line"
              onChange={this.handleChange}
              placeholder="line number"
              value={this.state.line}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Page number</Form.Label>
            <Form.Control
              id="page"
              type="number"
              name="page"
              onChange={this.handleChange}
              placeholder="page number"
              value={this.state.page}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={this.handleChange}
              required
              value={this.state.category}
            >
              <option></option>
              <option value="Enter">Enter</option>
              <option value="Exit">Exit</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              id="notes"
              name="notes"
              onChange={this.handleChange}
              placeholder="Add notes, like whether they should bring a certain prop on."
              rows="3"
              type="textarea"
              value={this.state.notes}
            />
          </Form.Group>
          <Button type="submit" variant="primary" block>
            Submit
          </Button>
          <Button type="button" onClick={this.props.onFormClose} block>
            Cancel
          </Button>
        </Form>
      </Col>
    );
  }
}

NewEntranceExitForm.propTypes = {
  actId: PropTypes.number.isRequired,
  characters: PropTypes.array.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  sceneId: PropTypes.number.isRequired,
  stageExits: PropTypes.array.isRequired,
};

export default NewEntranceExitForm;
