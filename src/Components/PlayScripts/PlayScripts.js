import React, {
  Component
} from 'react'
import {
  Accordion,
  Button,
  Card,
  Col,
  ListGroup,
  Row
} from 'react-bootstrap'

import {
  updateServerItem
} from '../../api/crud'

import {
  getActScript,
  getFrenchSceneScript,
  getSceneScript,
  getPlayScript,
  getPlaySkeleton
} from '../../api/plays'

import {
  calculateRunTime,
  getFrenchScenesFromAct,
  getFrenchScenesFromPlay,
  mergeTextFromFrenchScenes,
} from '../../utils/playScriptUtils'
import ScriptContainer from './ScriptContainer'

class PlayScripts extends Component {
  state={
    activeItem: {},
    play: [],
    showCut: true,
    text: {},
  }

  componentDidMount() {
    const playId = this.props.match.params.id
    this.loadSkeleton(playId)
  }

  buildActLi(act){
    let scenes = act.scenes.map((scene) => this.buildSceneLi(act, scene))
    return (
      <Card key={act.number}>
        <Accordion.Toggle as={Card.Header} eventKey={act.number}>
          Act {act.number}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={act.number}>
          <Card.Body>
            <div>
              <Button onClick={(event) => this.loadActText(act.id, event)}>Load full act text</Button>
            </div>
            <div>
              <ListGroup>
                {scenes}
              </ListGroup>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  buildFrenchSceneLi(actNumber, frenchScene, sceneNumber, text) {
    let frenchSceneNumber = actNumber + "." + sceneNumber + "." + frenchScene.number
      return(
        <ListGroup.Item key={frenchSceneNumber}>
          <Button onClick={() => this.loadFrenchSceneText(frenchScene.id)}>Load French Scene {frenchSceneNumber} fulltext</Button>
        </ListGroup.Item>
      )
  }

  buildSceneLi(act, scene) {
    let frenchScenes = scene.french_scenes.map((frenchScene) => this.buildFrenchSceneLi(act.number, frenchScene, scene.number))
    let actScene = act.number + "." + scene.number
    return (
      <ListGroup.Item key={actScene}>
        <Button onClick={() => this.loadSceneText(scene.id)}>Load Scene {act.number}.{scene.number} fulltext</Button>
        <ListGroup>
          {frenchScenes}
        </ListGroup>
      </ListGroup.Item>
    )
  }

  cutEntireText(lineArray) {
    var self = this;
    const types = ["lines", "stage_directions", "sound_cues"]
    types.forEach(function(type) {
      var allTheLines = lineArray[type]
      let updatedLines = allTheLines.map((line) => {
        var newLine = {
          ...line,
          new_content: ' '
        }
        self.handleLineSubmit(newLine)
        return newLine
      })
      self.updateTextInState(type, updatedLines)
    })
  }

  unCutEntireText(lineArray) {
    var self = this;
    const types = ["lines", "stage_directions", "sound_cues"]
    types.forEach(function(type) {
      var allTheLines = lineArray[type]
      let updatedLines = allTheLines.map((line) => {
        var newLine = {
          ...line,
          new_content: ''
        }
        self.handleLineSubmit(newLine)
        return newLine
      })
      self.updateTextInState(type, updatedLines)
    })
  }

  handleLineSubmit = (line) => {
    this.updateLine(line)
  }

  toggleShowCut(){
    this.setState({
      showCut: !this.state.showCut
    })
  }

  updateTextInState (type, lineArray){
    console.log('update text called', type)
    let oldLines = this.state.text[type]
    let newLines = oldLines.map(obj => {
      let newLine = lineArray.find(p => p.id === obj.id)
      return newLine || obj
    })
    this.setState({
      text: {
        ...this.state.text,
        [type]: newLines
      }
    })
  }

  unloadText = () => {
    this.setState({
      text: {}
    })
  }

  async loadSkeleton(playId) {
    const response = await getPlaySkeleton(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving play'
      })
    } else {
      this.setState({play: response.data})
    }
  }

  async loadActText(actId, event) {
    this.setState({ text: {}})
    const response = await getActScript(actId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving act'
      })
    } else {
      let frenchScenes = getFrenchScenesFromAct(response.data)
      let text = mergeTextFromFrenchScenes(frenchScenes)
      this.setState({
        activeItem: actId,
        heading: response.data.heading,
        text: text
      })
    }
  }

  async loadFrenchSceneText(frenchSceneId) {
    this.setState({ text: {}})
    const response = await getFrenchSceneScript(frenchSceneId)

    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving french scene'
      })
    } else {
      this.setState({
        activeItem: frenchSceneId,
        heading: `French Scene ${response.data.pretty_name}`,
        text: response.data
      })
    }
  }

  async loadPlayText(playId) {
    this.setState({ text: {}})
    const response = await getPlayScript(playId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving play'
      })
    } else {
      let frenchScenes = getFrenchScenesFromPlay(response.data)

      let text = mergeTextFromFrenchScenes(frenchScenes)
      this.setState({
        activeItem: this.state.play,
        heading: response.data.title,
        text: text
      })
    }
  }

  async loadSceneText(sceneId) {
    this.setState({ text: {}})
    const response = await getSceneScript(sceneId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error retrieving scene'
      })
    } else {
      let text = mergeTextFromFrenchScenes(response.data.french_scenes)
      this.setState({
        activeItem: sceneId,
        heading: `Scene ${response.data.pretty_name}`,
        text: text
      })
    }
  }

  async updateLine(line) {
    delete line.diffed_content
    let response
    let kindOfLine = ''
    if (line.kind.match(/business|delivery|entrance|exit|mixed|modifier|location/)) {
      kindOfLine = 'stage_direction'
    } else if (line.kind.match(/flourish|music/)) {
      kindOfLine = 'sound_cue'
    } else {
      kindOfLine = 'line'
    }
    response = await updateServerItem(line, kindOfLine)
    if (response.status >= 400) {
      this.setState({
        errorStatus: `Error updating ${kindOfLine}`
      })
    } else {
      let oldLines = this.state.text[`${kindOfLine}s`]
      let newLines = oldLines.map(oldLine => {
        if (oldLine.id === line.id) {
          return line
        } else {
          return oldLine
        }
      })
      this.setState({
        text: {
          ...this.state.text,
          [`${kindOfLine}s`]: newLines
        }
      })
    }
  }

  render() {
    let acts
    let minutesRunTime
    let hoursRunTime
    let play = this.state.play
    if (!this.state.play.acts) {
      return <div>Loading play!</div>
    } else {
      acts = play.acts.map((act) => this.buildActLi(act))
      if (this.state.text.lines && this.state.play.production && this.state.play.production.lines_per_minute) {
        minutesRunTime = calculateRunTime(this.state.text.lines, this.state.play.production.lines_per_minute).toFixed(2)
        hoursRunTime = (minutesRunTime/60).toFixed(2)
      }
    }

    return(
      <Col md={12}>
        <h2>{play.title}</h2>
        <Button onClick={() => this.toggleShowCut()}>
          {
            this.state.showCut
            ?
            <span>Hide</span>
            :
            <span>Show</span>
          } Text Cuts
        </Button>
        <div className="instructions">
          To edit text, double-click on it.
          {
            this.state.play.canonical
            ?
            <p>This text is the master text of the play. Edit with caution!</p>
            :
            <span></span>
          }
        </div>
        <div>
          {
            this.state.text.lines && this.state.play.production && this.state.play.production.lines_per_minute
            ?
            <strong>Run time at {this.state.play.production.lines_per_minute} lines per minute: {minutesRunTime} minutes ({hoursRunTime} hours)</strong>
            :
            <span></span>
          }
        </div>
        <Col>
          <Row>
            <Col md={3} >
              <div id="play_script">
                <Button onClick={() => this.loadPlayText(play.id)}>Load Full Text</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Accordion>
                {acts}
              </Accordion>
            </Col>
            <Col md={9}>
                  <h2>{this.state.heading}</h2>
                  <Button onClick={() => this.cutEntireText(this.state.text)}>
                    Cut all of this
                  </Button>
                  <Button onClick={() => this.unCutEntireText(this.state.text)}>
                    Uncut all of this
                  </Button>

              <ScriptContainer
                activeItem={this.state.activeItem}
                characters={this.state.play.characters}
                handleLineSubmit={this.handleLineSubmit}
                heading={this.state.heading}
                showCut={this.state.showCut}
                text={this.state.text}
                unloadText={this.unloadText}
              />
            </Col>
          </Row>
        </Col>
      </Col>
    )
  }
}

export default PlayScripts
