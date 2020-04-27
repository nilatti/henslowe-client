import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'
import OnStageForm from './OnStageForm'
import OnStageShow from './OnStageShow'

class EditableOnStage extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.frenchSceneId)
  }

  handleSubmit = (onStage) => {
    this.props.handleEditSubmit(onStage)
    this.closeForm()
  }

  render() {
    return (
      <div>
        <OnStageShow
          changeNonspeaking={this.props.changeNonspeaking}
          frenchSceneId={this.props.frenchSceneId}
          handleEditClick={this.handleEditClick}
          onStage={this.props.onStage}
        />
      </div>
    )
  }
}

EditableOnStage.propTypes = {
  changeNonspeaking: PropTypes.func.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  onStage: PropTypes.object.isRequired,
}

export default EditableOnStage
