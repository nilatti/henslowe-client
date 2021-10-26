import PropTypes from "prop-types";
import React, { Component } from "react";

import { Form } from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";

import _ from "lodash";

class EntranceExitShow extends Component {
  constructor(props) {
    super(props);
    var selectedCharacterIds = this.props.entranceExit.characters.map(
      (character) => character.id
    );
    var selectedCharacters = _.filter(
      this.props.play.characters,
      function (character) {
        return selectedCharacterIds.includes(character.id);
      }
    );
    var selectedStageExit = this.props.production.stage_exits.find(
      (stageExit) => stageExit.id === this.props.entranceExit.stage_exit_id
    );
    this.state = {
      category: this.props.entranceExit.category,
      categoryFormOpen: false,
      line: this.props.entranceExit.line,
      lineFormOpen: false,
      notes: this.props.entranceExit.notes,
      notesFormOpen: false,
      page: this.props.entranceExit.page,
      pageFormOpen: false,
      selectedCharacters: selectedCharacters.map((character) => ({
        id: character.id,
        label: character.name,
      })),
      selectedStageExit: [
        { id: selectedStageExit.id, label: selectedStageExit.name },
      ],
      stageExit: this.props.entranceExit.stage_exit,
      stageExitFormOpen: false,
    };
  }

  handleCategoryBlur = (event) => {
    var category = event.target.value;
    var entranceExit = { ...this.props.entranceExit, category };
    this.toggleForm("category");
    this.setState({ category: category });
    this.processSubmit(entranceExit);
  };

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleCharacterChange = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacters: e,
      });
    }
  };

  handleCharacterSubmit = () => {
    var entranceExit = {
      ...this.props.entranceExit,
      character_ids: this.state.selectedCharacters.map(
        (character) => character.id
      ),
    };
    this.processSubmit(entranceExit);
    this.toggleForm("character");
  };

  handleKeyPress = (e, formName) => {
    if (e.key === "Enter") {
      this.toggleForm(formName);
      var func = `handle${_.upperFirst(formName)}Change`;
      this[func](e);
    } else if (e.key === "Escape") {
      this.toggleForm(formName);
    }
  };

  handleLineChange = (event) => {
    this.handleChange(event);
    var line = event.target.value;
    var entranceExit = { ...this.props.entranceExit, line };
    this.processSubmit(entranceExit);
    this.toggleForm("line");
  };

  handleNotesChange = (event) => {
    this.handleChange(event);
    var notes = event.target.value;
    var entranceExit = { ...this.props.entranceExit, notes };
    this.processSubmit(entranceExit);
    this.toggleForm("notes");
  };

  handlePageChange = (event) => {
    this.handleChange(event);
    var page = event.target.value;
    var entranceExit = { ...this.props.entranceExit, page };
    this.processSubmit(entranceExit);
    this.toggleForm("page");
  };

  handleStageExitChange = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedStageExit: [e[0]],
      });
    }
  };

  handleStageExitSubmit = () => {
    var stage_exit_id = this.state.selectedStageExit[0].id;
    var entranceExit = { ...this.props.entranceExit, stage_exit_id };
    this.processSubmit(entranceExit);
    this.toggleForm("stageExit");
  };

  processSubmit = (entranceExit) => {
    delete entranceExit["characters"];
    delete entranceExit["stage_exit"];
    this.props.onEdit(
      this.props.actId,
      this.props.sceneId,
      this.props.frenchSceneId,
      entranceExit
    );
  };

  toggleForm = (formName) => {
    var form = `${formName}FormOpen`;
    this.setState({
      [`${form}`]: !this.state[form],
    });
  };
  render() {
    const entranceExit = this.props.entranceExit;
    var characters = this.props.play.characters.map((character) => ({
      id: character.id,
      label: String(character.name),
    }));
    var characterNames = _.map(this.state.selectedCharacters, "label").join(
      ", "
    );
    var stageExits = this.props.production.stage_exits.map((stageExit) => ({
      id: stageExit.id,
      label: String(stageExit.name),
    }));
    return (
      <tr>
        <td>
          {this.state.lineFormOpen ? (
            <Form.Group className="row">
              <Form.Label>Line</Form.Label>
              <Form.Control
                type="number"
                placeholder={this.state.line || "line"}
                name="line"
                onBlur={this.handleLineChange}
                onChange={this.handleChange}
                onKeyDown={(e) => this.handleKeyPress(e, "line")}
                value={this.state.line || ""}
              />
            </Form.Group>
          ) : (
            <span onClick={() => this.toggleForm("line")}>
              Line {this.state.line}
            </span>
          )}
        </td>
        <td>
          {this.state.pageFormOpen ? (
            <Form.Group>
              <Form.Label>Page</Form.Label>
              <Form.Control
                type="number"
                placeholder={this.state.page || "page"}
                name="page"
                onBlur={this.handlePageChange}
                onChange={this.handleChange}
                onKeyDown={(e) => this.handleKeyPress(e, "page")}
                value={this.state.page || ""}
              />
            </Form.Group>
          ) : (
            <span onClick={() => this.toggleForm("page")}>
              Page {this.state.page}
            </span>
          )}
        </td>
        <td>
          {this.state.characterFormOpen ? (
            <Form>
              <Form.Group>
                <Form.Label>Characters</Form.Label>
                <Typeahead
                  id="character"
                  multiple
                  options={characters}
                  onBlur={this.handleCharacterSubmit}
                  onChange={this.handleCharacterChange}
                  placeholder="Choose the characters"
                  required
                  selected={this.state.selectedCharacters}
                />
                <Form.Control.Feedback type="invalid">
                  Character is required
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          ) : (
            <span>
              <span onDoubleClick={() => this.toggleForm("character")}>
                {characterNames}
              </span>
              <br />
            </span>
          )}
        </td>
        <td>
          {this.state.categoryFormOpen ? (
            <Form>
              <Form.Group controlId="category">
                <Form.Label>Enter or Exit?</Form.Label>
                <Form.Control
                  as="select"
                  onBlur={(selected) => {
                    this.handleCategoryBlur(selected);
                  }}
                  onChange={(selected) => {
                    this.handleCategoryBlur(selected);
                  }}
                >
                  <option value="Enter">Enter</option>
                  <option value="Exit">Exit</option>
                </Form.Control>
              </Form.Group>
            </Form>
          ) : (
            <span>
              <span onDoubleClick={() => this.toggleForm("category")}>
                {entranceExit.category}
              </span>
            </span>
          )}
        </td>
        <td>
          {this.state.stageExitFormOpen ? (
            <Form>
              <Form.Group>
                <Form.Label>Stage Exit</Form.Label>
                <Typeahead
                  id="stage_exit"
                  required
                  options={stageExits}
                  onBlur={this.handleStageExitSubmit}
                  onChange={this.handleStageExitChange}
                  selected={this.state.selectedStageExit}
                  placeholder="Choose the exit"
                />
                <Form.Control.Feedback type="invalid">
                  Stage Exit is required
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          ) : (
            <span>
              <span onDoubleClick={() => this.toggleForm("stageExit")}>
                {this.state.selectedStageExit[0].label}
              </span>
              <br />
            </span>
          )}
        </td>
        <td>
          {this.state.notesFormOpen ? (
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="textarea"
                placeholder={this.state.notes || "notes"}
                name="notes"
                onBlur={this.handleNotesChange}
                onChange={this.handleChange}
                onKeyDown={(e) => this.handleKeyPress(e, "notes")}
                value={this.state.notes || ""}
              />
            </Form.Group>
          ) : (
            <span onClick={() => this.toggleForm("notes")}>
              Notes {this.state.notes}
            </span>
          )}
        </td>
        <td>
          <span
            className="right floated trash icon"
            onClick={() =>
              this.props.onDeleteClick(
                this.props.actId,
                this.props.sceneId,
                this.props.frenchSceneId,
                entranceExit.id
              )
            }
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </td>
      </tr>
    );
  }
}

EntranceExitShow.propTypes = {
  actId: PropTypes.number.isRequired,
  entranceExit: PropTypes.object.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  production: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
};

export default EntranceExitShow;
