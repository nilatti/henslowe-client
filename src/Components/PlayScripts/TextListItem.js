import PropTypes from 'prop-types';
import React, {Component} from 'react'
import {
  Button,
  ListGroup
} from 'react-bootstrap'

import _ from 'lodash'
import LineShow from './LineShow'

class TextListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async handleClick () {
    let text = await this.props.onClick(this.props.id)
    this.setState({
      text: text
    })
  }

  unloadText() {
    this.setState({
      text: null,
    })
  }

  extractNumberFromXmlId(xmlId){
    let order_number = xmlId.replace(/[^0-9]/g,'')
    return parseFloat(order_number)
  }

  buildLine(line) {
    if (line.words){
      let words = line.words.map((word) => {
        word.order_number = this.extractNumberFromXmlId(word.xml_id)
        return word
      })
      let orderedWords = _.orderBy(words, words.order_number)
      let orderedWordsContent = orderedWords.map((word) => word.content)
      return _.concat(orderedWordsContent).join('')
    } else {
      console.log('no words', line)
    }
  }

  orderText(){
    let lines = this.state.text.lines
    let stageDirections = this.state.text.stage_directions
    let bucket = this.state.text.lines.concat(this.state.text.stage_directions).concat(this.state.text.sound_cues)
    let linesWithFloatNumbers = bucket.map((line) => {
      line.order_number = this.extractNumberFromXmlId(line.xml_id)
      return line
    })
    return _.orderBy(linesWithFloatNumbers, ['line', 'order_number'])
  }

  render() {
    if (this.state.text) {
      let lines = this.orderText()

      let lineItems = lines.map((line) =>
        <LineShow
          key={line.order_number}
          line={line}
        />
      )
      return(
        <div>
          {lineItems}
          <Button onClick={() => this.unloadText()}>Hide Text</Button>
        </div>
      )
    }
    return(
      <ListGroup.Item key={this.props.prettyNumber}>
        <Button  onClick={() => this.handleClick()}>Load {this.props.prettyNumber} text</Button>
      </ListGroup.Item>
    )
  }
}

TextListItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  prettyNumber: PropTypes.string.isRequired,
  subItems: PropTypes.array,
  text: PropTypes.object,
}
export default TextListItem
