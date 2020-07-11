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

import SceneFormToggle from './Scenes/SceneFormToggle'
import SceneInfoTab from './Scenes/SceneInfoTab'
import {filterEmptyContent} from '../../../utils/playScriptUtils'

class ActShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.act.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let sceneTabs
    if (this.props.act.scenes[0]) {
      sceneTabs = filterEmptyContent(this.props.act.scenes).map((scene) =>
        <Tab eventKey={`scene-${scene.id}`} title={`Scene ${scene.number}`} key={`scene-${scene.id}`}>
          <SceneInfoTab
            actId={this.props.act.id}
            handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
            handleEntranceExitDeleteClick={this.props.handleEntranceExitDeleteClick}
            handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
            handleFrenchSceneCreateFormSubmit={this.props.handleFrenchSceneCreateFormSubmit}
            handleFrenchSceneDeleteClick={this.props.handleFrenchSceneDeleteClick}
            handleFrenchSceneEditFormSubmit={this.props.handleFrenchSceneEditFormSubmit}
            handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
            handleOnStageDeleteClick={this.props.handleOnStageDeleteClick}
            handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
            handleSceneEditFormSubmit={this.props.handleSceneEditFormSubmit}
            scene={scene}
            sceneId={scene.id}
            onDeleteClick={this.props.handleSceneDeleteClick}
            play={this.props.play}
            production={this.props.production}
          />
        </Tab>
      )
    } else {
      sceneTabs = <div>No scenes found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>Act {this.props.act.number}</h2>
            <p>
              {this.props.act.summary}
            </p>
            {
              this.props.act.start_page ?
                <p>
                  Pages {this.props.act.start_page} - {this.props.act.end_page}
                </p>
              :
              <br />
            }
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
        <h2>Scenes</h2>
        </Row>
        <Row>
          <SceneFormToggle
            actId={this.props.act.id}
            isOpen={false}
            onFormSubmit={this.props.handleSceneCreateFormSubmit}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="scene-info-tabs"
        >
          {sceneTabs}
        </Tabs>
      </div>
    )
  }
}

ActShow.defaultProps = {
  act: {
    scenes: []
  },
}

ActShow.propTypes = {
  act: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
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
  handleSceneCreateFormSubmit: PropTypes.func.isRequired,
  handleSceneDeleteClick: PropTypes.func.isRequired,
  handleSceneEditFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default ActShow
