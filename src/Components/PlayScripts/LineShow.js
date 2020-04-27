import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';

import {
  Col,
  Button,
  Row
} from 'react-bootstrap'

import uuid from 'react-uuid'

import CharacterSelect from '../Plays/Characters/CharacterSelect'
import LineEditForm from './LineEditForm'
var Diff = require('diff');

class LineShow extends Component {
  state={
    characterSelectOpen: false,
    editFormOpen: false,
    line: this.props.line,
    selectedCharacter: [this.props.line.character],
  }

  buildLineContentWithDiffs(diffArray) {
    let diffArrayWithClasses = diffArray.map((item) => {
      if (item.removed == true) {
        return <span className="cut" key={uuid()}>{item.value}</span>
      } else if (item.added == true) {
        return <span className="added" key={uuid()}>{item.value}</span>
      } else {
        return <span key={uuid()}>{item.value}</span>
      }
    })
    return diffArrayWithClasses
  }

  handleChangeCharacter = (e) => {
    if (e.length > 0) {
      this.setState({
        selectedCharacter: [e[0]]
      })
    }
  }

  handleCutWholeLine = () => {
    let line = {
      ...this.state.line,
      new_content: ' '
    }
    this.props.handleLineSubmit(line)
  }

  handleUnCutWholeLine = () => {
    let line = {
      ...this.state.line,
      new_content: ''
    }
    this.props.handleLineSubmit(line)
  }

  submitCharacterEdit = () => {
    this.toggleCharacterSelectOpen()
    let line = {
      ...this.state.line,
      character_id: this.state.selectedCharacter[0].id,
      character: {
        id: this.state.selectedCharacter[0].id,
        name: this.state.selectedCharacter[0].name
      }
    }
    this.props.handleLineSubmit(line)
  }

  toggleCharacterSelectOpen() {
    this.setState({
      characterSelectOpen: !this.state.characterSelectOpen,
    })
  }

  toggleEditForm() {
    this.setState({
      editFormOpen: !this.state.editFormOpen,
    })
  }

  submitLineEdit = (line) => {
    this.toggleEditForm()
    this.props.handleLineSubmit(line)
  }

  render() {
    let line = this.props.line
    if (line.new_content) {
      line.diffed_content = this.buildLineContentWithDiffs(Diff.diffWordsWithSpace(line.original_content, line.new_content))
    }
    let lineText
    if (line.diffed_content && this.props.showCut) {
      lineText = line.diffed_content
    } else if (line.new_content) {
      lineText = line.new_content
    } else {
      lineText = line.original_content
    }
    let characterComponent
    if (this.props.showCharacter) {
      if (this.state.characterSelectOpen) {
        characterComponent = <CharacterSelect
          characters={this.props.characters}
          handleChangeCharacter={this.handleChangeCharacter}
          onBlur={this.submitCharacterEdit}
          selectedCharacter={this.state.selectedCharacter}
        />
      } else {
        characterComponent = <span onDoubleClick={() => this.toggleCharacterSelectOpen()}>{line.character.name || line.character.xml_id}</span>
      }
    } else {
      characterComponent = <span></span>
    }
    if (line.number && line.number.match(/^SD/)) {
      return (
      <Row className="script-cut-interface-row">
        <Col md={2}>
          {line.number}
        </Col>
        <Col md={8} >
          <div id={line.number} className="stage-direction">
          { this.state.editFormOpen ?
            <span>
              <LineEditForm line={line} onSubmit={this.submitLineEdit}/>
            </span>
            :
            <div id={line.number} className="line">
            <span onDoubleClick={() => this.toggleEditForm()}>{lineText}</span>
            </div>
          }
          </div>
        </Col>
        <Col md={2}>
          {
            this.state.line.new_content != ' '
            ?
            <Button className="toggle-cut" variant="info" size="sm" onClick={() => this.handleCutWholeLine()}>Cut Whole Line</Button>
            :
            <Button className="toggle-cut" size="sm" variant="outline-info" onClick={() => this.handleUnCutWholeLine()}>Un-Cut Whole Line</Button>
          }
        </Col>
      </Row>
      )
    }
    return (
      <Row className="script-cut-interface-row">
        <Col md={2}>
          {line.number}
        </Col>
        <Col md={2} className="character-name">
          {characterComponent}
        </Col>
        <Col md={6}>
        { this.state.editFormOpen ?
          <span>
            <LineEditForm line={line} onSubmit={this.submitLineEdit}/>
          </span>
          :
          <div id={line.number} className="line">
          <span onDoubleClick={() => this.toggleEditForm()}>{lineText}</span>
          </div>
        }
        </Col>
        <Col md={2}>
          {
            this.state.line.new_content != ' '
            ?
            <Button className="toggle-cut" variant="info" size="sm" onClick={() => this.handleCutWholeLine()}>Cut Whole Line</Button>
            :
            <Button className="toggle-cut" size="sm" variant="outline-info" onClick={() => this.handleUnCutWholeLine()}>Un-Cut Whole Line</Button>
          }
        </Col>
      </Row>
    )
  }
}

LineShow.propTypes = {
  characters: PropTypes.array.isRequired,
  handleLineSubmit: PropTypes.func.isRequired,
  line: PropTypes.object.isRequired,
  showCharacter: PropTypes.bool.isRequired,
  showCut: PropTypes.bool.isRequired
}

export default LineShow
