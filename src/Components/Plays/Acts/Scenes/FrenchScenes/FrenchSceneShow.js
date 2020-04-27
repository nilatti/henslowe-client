import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
} from 'react-bootstrap'

import OnStagesList from './OnStages/OnStagesList'
import EntranceExitList from './EntranceExits/EntranceExitList'

class FrenchSceneShow extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.frenchScene.id)
  }

  changeNonspeaking = (event, onStage) => {
    onStage.nonspeaking = !onStage.nonspeaking
    this.props.handleEditSubmit(onStage)
  }

  handleEditSubmit = (onStage) => {
    this.props.handleEditSubmit(onStage)
  }

  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.sceneId})
    let frenchScene = _.find(scene.french_scenes, {'id': this.props.frenchScene.id})
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.actNumber}.{this.props.sceneNumber}.{frenchScene.number}</h2>
            <p>
              {frenchScene.summary}
            </p>
            <span
              className='right floated edit icon'
              onClick={this.props.handleEditClick}
            >
              <i className="fas fa-pencil-alt"></i>
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleDeleteClick}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </Col>
        </Row>
        <Row>
          {
            frenchScene.start_page ?
              <p>
                Pages {frenchScene.start_page} - {frenchScene.end_page}
              </p>
            :
            <br />
          }
        </Row>
        <Row>
          <h3>Characters</h3>
        </Row>
        <Row>
          <ul>
            <OnStagesList
              actId={this.props.actId}
              frenchSceneId={frenchScene.id}
              handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
              onDeleteClick={this.props.handleOnStageDeleteClick}
              handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
              play={this.props.play}
              sceneId={this.props.sceneId}
            />
          </ul>
        </Row>
        {
          !this.props.play.canonical
          ? <Row>
            <EntranceExitList
              actId={this.props.actId}
              frenchSceneId={frenchScene.id}
              handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
              onDeleteClick={this.props.handleEntranceExitDeleteClick}
              handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
              play={this.props.play}
              production={this.props.production}
              sceneId={this.props.sceneId}
            />
          </Row>
          : <span></span>

        }
      </div>
    )
  }
}

FrenchSceneShow.defaultProps = {
  scene: {
    french_scenes: []
  },
}

FrenchSceneShow.propTypes = {
  actId: PropTypes.number.isRequired,
  actNumber: PropTypes.number.isRequired,
  frenchScene: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitDeleteClick: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageDeleteClick: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
  sceneNumber: PropTypes.number.isRequired,
}

export default FrenchSceneShow
