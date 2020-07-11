import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import ActForm from './ActForm'
import ActShow from './ActShow'

class ActInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  closeForm = () => {
    this.toggleForm()
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.act.id)
  }

  handleEditClick = () => {
    this.toggleForm()
  }

  handleFormClose = () => {
    this.toggleForm()
  }

  handleSubmit = (act) => {
    this.props.handleEditSubmit(act)
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
        <ActForm
          act={this.props.act}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play={this.props.play}
        />
      )
    }
    return (
      <div>
        <ActShow
          act={this.props.act}
          handleDeleteClick={this.handleDeleteClick}
          handleEditClick={this.handleEditClick}
          handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
          handleEntranceExitDeleteClick={this.props.handleEntranceExitDeleteClick}
          handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
          handleFrenchSceneCreateFormSubmit={this.props.handleFrenchSceneCreateFormSubmit}
          handleFrenchSceneDeleteClick={this.props.handleFrenchSceneDeleteClick}
          handleFrenchSceneEditFormSubmit={this.props.handleFrenchSceneEditFormSubmit}
          handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
          handleOnStageDeleteClick={this.props.handleOnStageDeleteClick}
          handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
          handleSceneCreateFormSubmit={this.props.handleSceneCreateFormSubmit}
          handleSceneDeleteClick={this.props.handleSceneDeleteClick}
          handleSceneEditFormSubmit={this.props.handleSceneEditFormSubmit}
          play={this.props.play}
          production={this.props.production}
        />
      </div>
    )
  }
}

ActInfoTab.propTypes = {
  act: PropTypes.object.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitDeleteClick: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  handleFrenchSceneCreateFormSubmit: PropTypes.func.isRequired,
  handleFrenchSceneDeleteClick: PropTypes.func.isRequired,
  handleFrenchSceneEditFormSubmit: PropTypes.func.isRequired,
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageDeleteClick: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  handleSceneCreateFormSubmit: PropTypes.func.isRequired,
  handleSceneDeleteClick: PropTypes.func.isRequired,
  handleSceneEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default ActInfoTab
