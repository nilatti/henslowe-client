import PropTypes from "prop-types";

import React, { Component } from "react";

import { Form } from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";

class CharactersSelect extends Component {
  render() {
    return (
      <Form.Group>
        <Form.Label>Characters</Form.Label>
        <Typeahead
          id="characters"
          multiple
          required
          options={this.props.characters}
          onChange={(selected) => {
            this.props.handleChangeCharacter(selected);
          }}
          selected={this.props.selectedCharacters}
          placeholder="Choose the characters"
        />
        <Form.Control.Feedback type="invalid">
          Character is required
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

CharactersSelect.propTypes = {
  characters: PropTypes.array.isRequired,
  selectedCharacters: PropTypes.array.isRequired,
  handleChangeCharacter: PropTypes.func.isRequired,
};

export default CharactersSelect;

//tktk refactor to put it into charcterselect with a prop for multiple
