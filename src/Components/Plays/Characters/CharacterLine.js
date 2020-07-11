import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';

import {
  Col,
  Row
} from 'react-bootstrap'

import uuid from 'react-uuid'

var Diff = require('diff');

class CharacterLine extends Component {

  buildLineContentWithDiffs(diffArray) {
    let diffArrayWithClasses = diffArray.map((item) => {
      if (item.removed === true) {
        return <span className="cut" key={uuid()}>{item.value}</span>
      } else if (item.added === true) {
        return <span className="added" key={uuid()}>{item.value}</span>
      } else {
        return <span key={uuid()}>{item.value}</span>
      }
    })
    return diffArrayWithClasses
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
    if (line.number && line.number.match(/^SD/)) {
      return (
      <Row className="script-cut-interface-row">
        <Col md={2}>
          {line.number}
        </Col>
        <Col md={10} >
          <div id={line.number} className="stage-direction">
            <div id={line.number} className="line">
              {lineText}
            </div>
          </div>
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
          {this.props.character.last_name}
        </Col>
        <Col md={8}>
          <div id={line.number} className="line">
            {lineText}
          </div>
        </Col>
      </Row>
    )
  }
}

CharacterLine.propTypes = {
  character: PropTypes.object.isRequired,
  line: PropTypes.object.isRequired,
  showCut: PropTypes.bool.isRequired
}

export default CharacterLine
