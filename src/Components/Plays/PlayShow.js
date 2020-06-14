import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import {
  Link,
} from 'react-router-dom'

import ActFormToggle from './Acts/ActFormToggle'
import ActInfoTab from './Acts/ActInfoTab'

import CharacterFormToggle from './Characters/CharacterFormToggle'
import CharacterInfoTab from './Characters/CharacterInfoTab'

import {filterEmptyActs} from '../../utils/playScriptUtils'

class PlayShow extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.play.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {
    let actTabs
    let characterTabs
    if (this.props.play.acts) {
      actTabs = filterEmptyActs(this.props.play).map((act) =>
        <Tab
          eventKey={`act-${act.id}`}
          key={`act-${act.id}`}
          title={`Act ${act.number}`}
        >
        <ActInfoTab
          act={act}
          handleEditSubmit={this.props.handleActEditFormSubmit}
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
          onDeleteClick={this.props.handleActDeleteClick}
        />
      </Tab>
      )
    } else {
      actTabs = <div>No acts found</div>
    }
    if (this.props.play.characters) {
      characterTabs = this.props.play.characters.map((character) =>
        <Tab
          eventKey={`character-${character.id}`}
          key={`character-${character.id}`}
          play={this.props.play}
          title={`${character.name}`}
        >
        <CharacterInfoTab
          character={character}
          handleEditSubmit={this.props.handleCharacterEditFormSubmit}
          onDeleteClick={this.props.handleCharacterDeleteClick}
          play={this.props.play}
        />
      </Tab>
      )
    } else {
      characterTabs = <div>No acts found</div>
    }
    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.play.title}</h2>
            {
              this.props.play.genre
              ?
              <span>a {this.props.play.genre.join('/')}<br /></span>
              :
              <span></span>
            }
            {this.props.play.canonical ? <p><em> Canonical Version</em></p> : <p></p>}
            by <Link to={`/authors/${this.props.play.author.id}`}> {this.props.play.author.first_name} {this.props.play.author.last_name}</Link><br />
            {this.props.play.date}<br />
            <p>{this.props.play.synopsis}</p>
            <p>{this.props.play.text_notes}</p>
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
          <h2>Characters</h2>
        </Row>
        <Row>
          <CharacterFormToggle
            isOpen={false}
            onFormSubmit={this.props.handleCharacterCreateFormSubmit}
            play_id={this.props.play.id}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="character-info-tabs"
        >
        {characterTabs}
      </Tabs>
      <Row>
        <Link to={`${this.props.play.id}/playscripts/`}>
          <Button variant="info">
            Edit Script
          </Button>
        </Link>
      </Row>
      <Row>
        <h2>Acts</h2>
        </Row>
        <Row>
          <ActFormToggle
            isOpen={false}
            onFormSubmit={this.props.handleActCreateFormSubmit}
            play={this.props.play}
          />
        </Row>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="act-info-tabs"
        >
          {actTabs}
        </Tabs>
      </div>
    )
  }
}

PlayShow.propTypes = {
  handleActCreateFormSubmit: PropTypes.func.isRequired,
  handleActDeleteClick: PropTypes.func.isRequired,
  handleActEditFormSubmit: PropTypes.func.isRequired,
  handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
  handleCharacterDeleteClick: PropTypes.func.isRequired,
  handleCharacterEditFormSubmit: PropTypes.func.isRequired,
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
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
}

export default PlayShow
