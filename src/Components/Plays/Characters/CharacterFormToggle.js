import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import CharacterForm from './CharacterForm.js'

class CharacterFormToggle extends Component { //opens form for create action
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (character) => {
    this.handleFormClose()
    this.props.onFormSubmit(character)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <CharacterForm
          play_id={this.props.play_id}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New Character
          </Button>
        </div>
      );
    }
  }
}

CharacterFormToggle.propTypes = {
  play_id: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default CharacterFormToggle