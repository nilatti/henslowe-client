import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Form,
} from 'react-bootstrap'

import {
  Typeahead
} from 'react-bootstrap-typeahead';

class CharacterSelect extends Component {

  render() {
    return(
      <Form.Group>
        <Form.Label>
          Character
        </Form.Label>
        <Typeahead
          labelKey="label"
          id="character"
          required
          options={this.props.characters}
          onBlur={this.props.onBlur}
          onChange={(selected) => {
            this.props.handleChangeCharacter(selected)
          }}
          selected={this.props.selectedCharacter}
          placeholder="Choose the character"
        />
        <Form.Control.Feedback type="invalid">
            Character is required
        </Form.Control.Feedback>
      </Form.Group>
    )
  }
}

CharacterSelect.propTypes = {
  characters: PropTypes.array.isRequired,
  onBlur: PropTypes.func,
  selectedCharacter: PropTypes.array.isRequired,
  handleChangeCharacter: PropTypes.func.isRequired,
}

export default CharacterSelect
