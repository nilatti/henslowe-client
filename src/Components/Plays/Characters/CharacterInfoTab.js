import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'

import CharacterForm from './CharacterForm'
import CharacterShow from './CharacterShow'

class CharacterInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.character.id)
  }

  handleFormClose = () => {
    this.toggleForm()
  }

  handleEditClick = () => {
    this.toggleForm()
  }

  handleSubmit = (character) => {
    this.props.handleEditSubmit(character)
    this.toggleForm()
  }

  toggleForm = () => {
    this.setState({
      editFormOpen: !this.state.editFormOpen
    })
  }

  render() {
    if (this.state.editFormOpen) {
      return (
        <CharacterForm
          character={this.props.character}
           onFormClose={this.handleFormClose}
           onFormSubmit={this.handleSubmit}
           play_id={this.props.play.id}
          />
      )
    }
    return (
      <div>
        <CharacterShow
          character={this.props.character}
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
        </div>
    )
  }
}

CharacterInfoTab.propTypes = {
  character: PropTypes.object.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default CharacterInfoTab
