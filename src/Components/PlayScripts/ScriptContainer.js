import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {Component} from 'react'
import {
  Button,
  ListGroup
} from 'react-bootstrap'
import uuid from 'react-uuid'

import {
  updateServerItem
} from '../../api/crud'
import LineShow from './LineShow'
import {sortLines} from '../../utils/playScriptUtils'

class ScriptContainer extends Component {

  extractNumberFromXmlId(xmlId){
    let order_number = xmlId.replace(/[^0-9\.]/g,'')
    return parseFloat(order_number)
  }

  orderText() {
    let lines = this.props.text.lines
    let stageDirections = this.props.text.stage_directions
    let bucket = this.props.text.lines.concat(this.props.text.stage_directions).concat(this.props.text.sound_cues)
    bucket = _.filter(bucket, function(o) { return !o.original_content.match(/^$/)})
    if (!this.props.showCut) {
      bucket = _.filter(bucket, function(o) {
        if (o.new_content) {
          return !o.new_content.match(/^ $/)
        } else {
          return o
        }
      })
    }
    return sortLines(bucket)
  }

  render() {
    if (this.props.text.lines && this.props.text.lines.length > 0) {
      let lines = this.orderText()
      let currentCharacter = {}
      let showCharacter = ''
      let lineItems = lines.map((line) =>{
        if (line.character && line.character.id !== currentCharacter.id) {
          currentCharacter = line.character
          showCharacter = true
        } else {
          showCharacter = false
        }
        return (
          <LineShow
            key={uuid()}
            line={line}
            characters={this.props.characters}
            handleLineSubmit={this.props.handleLineSubmit}
            showCharacter={showCharacter}
            showCut={this.props.showCut}
          />
        )
        }
      )
      return(
        <div>
          {lineItems}
          <Button onClick={() => this.props.unloadText()}>Hide Text</Button>
        </div>
      )
    }
    return (
      <div>
        No text selected
      </div>
    )
  }
}

ScriptContainer.propTypes = {
  characters: PropTypes.array.isRequired,
  handleLineSubmit: PropTypes.func.isRequired,
  showCut: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired,
  unloadText: PropTypes.func.isRequired,
}

export default ScriptContainer
