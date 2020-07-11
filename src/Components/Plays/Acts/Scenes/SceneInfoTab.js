import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import SceneForm from './SceneForm'
import SceneShow from './SceneShow'

class SceneInfoTab extends Component {
  state = {
    editFormOpen: false
  }

  handleEditClick = () => {
    this.toggleForm()
  }
  handleFormClose = () => {
    this.toggleForm()
  }
  handleSubmit = (actId, scene) => {
    this.props.handleSceneEditFormSubmit(actId, scene)
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
        <SceneForm
          actId={this.props.actId}
          scene={this.props.scene}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleSubmit}
          play_id={this.props.play.id}
        />
      )
    }
    return (
      <div>
        <SceneShow
          actId={this.props.actId}
          handleEditClick={this.handleEditClick}
          onDeleteClick={this.props.onDeleteClick}
          handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
          handleEntranceExitDeleteClick={this.props.handleEntranceExitDeleteClick}
          handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
          handleFrenchSceneCreateFormSubmit={this.props.handleFrenchSceneCreateFormSubmit}
          handleFrenchSceneDeleteClick={this.props.handleFrenchSceneDeleteClick}
          handleFrenchSceneEditFormSubmit={this.props.handleFrenchSceneEditFormSubmit}
          handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
          handleOnStageDeleteClick={this.props.handleOnStageDeleteClick}
          handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
          play={this.props.play}
          production={this.props.production}
          sceneId={this.props.sceneId}
          />
      </div>
    )
  }
}

SceneInfoTab.propTypes = {
  actId: PropTypes.number.isRequired,
  handleSceneEditFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitDeleteClick: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  handleFrenchSceneCreateFormSubmit: PropTypes.func.isRequired,
  handleFrenchSceneDeleteClick: PropTypes.func.isRequired,
  handleFrenchSceneEditFormSubmit: PropTypes.func.isRequired,
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageDeleteClick: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
}

export default SceneInfoTab
