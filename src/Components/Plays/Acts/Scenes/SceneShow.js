import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'

import FrenchSceneFormToggle from './FrenchScenes/FrenchSceneFormToggle'
import FrenchSceneInfoTab from './FrenchScenes/FrenchSceneInfoTab'

class SceneShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.actId, this.props.scene.id)
  }

  handleFrenchSceneCreateClick = (frenchScene) => {
    this.props.handleFrenchSceneCreateFormSubmit(this.props.actId, this.props.sceneId, frenchScene)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.sceneId})
    let frenchSceneTabs
    if (scene.french_scenes[0] ) {
      frenchSceneTabs = scene.french_scenes.map((frenchScene) =>
            <Tab eventKey={`french_scene-${frenchScene.id}`} title={`${frenchScene.number}`} key={`french_scene-${frenchScene.id}`}>
              <FrenchSceneInfoTab
                actId={act.id}
                actNumber={act.number}
                frenchScene={frenchScene}
                handleEditSubmit={this.props.handleFrenchSceneEditFormSubmit}
                handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
                handleEntranceExitDeleteClick={this.props.handleEntranceExitDeleteClick}
                handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
                handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
                handleOnStageDeleteClick={this.props.handleOnStageDeleteClick}
                handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
                onDeleteClick={this.props.handleFrenchSceneDeleteClick}
                play={this.props.play}
                production={this.props.production}
                sceneId={scene.id}
                sceneNumber={scene.number}
              />
            </Tab>

        )
      } else {
        frenchSceneTabs = <div>Nothing to show here</div>
      }
    return (
      <div>
        <Row>
          <Col>
            <h2>Act {act.number}, Scene {scene.number}</h2>
            <p>
              {scene.summary}
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
        {
          scene.start_page ?
            <p>
              Pages {scene.start_page} - {scene.end_page}
            </p>
          :
          <br />
        }
        <Row>
          <h2>French Scenes</h2>
        </Row>
        <Row>
          <FrenchSceneFormToggle
            isOpen={false}
            onFormSubmit={this.handleFrenchSceneCreateClick}
            play={this.props.play}
            sceneId={scene.id}
            lastFrenchScene={_.last(scene.french_scenes)}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="french-scene-info-tabs"
        >
          {frenchSceneTabs}
        </Tabs>
      </div>
    )
  }
}

SceneShow.propTypes = {
  actId: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
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

export default SceneShow
