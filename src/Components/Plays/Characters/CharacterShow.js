import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Row,
} from 'react-bootstrap'

import {
  calculateLineCount,
} from '../../../utils/playScriptUtils'

import CharacterLine from './CharacterLine'

class CharacterShow extends Component {
  state={
    showCut: false,
  }
  handleDeleteClick = () => {
    this.props.handleDeleteClick(this.props.character.id)
  }

  toggleShowCut = () => {
    this.setState({
      showCut: !this.state.showCut,
    })
  }

  render() {
    let lines = this.props.character.lines
    lines = _.filter(lines, function(o) {
      if (o.original_content.match(/\s+/)) { //get rid of anything that is just blank spaces
        return o
      }
    })
    if (!this.state.showCut) {
      lines = _.filter(lines, function(o) {
        if (o.new_content && o.new_content.match(/\w/)) { //get rid of new ocntent that is blank spaces
          return o
        } else if (!o.new_content) {
          return o //or I guess if it doesn't have new content, return that?
        }
      })
    }
    lines = lines.map((line) =>
      <CharacterLine
        character={this.props.character}
        key={line.id}
        line={line}
        showCut={this.state.showCut}
      />
    )

    return (
      <div>
        <Row>
          <Col>
            <h2>{this.props.character.name}</h2>
            <p><em>{this.props.character.gender}, {this.props.character.age}</em></p>
            <p>
              {this.props.character.description}
            </p>
            {
              this.props.character.lines
              ?
              <p>
              Lines count: {calculateLineCount(this.props.character.lines)}
              </p>
              :
              <span></span>
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
              <Button onClick={this.toggleShowCut}>
                {
                  this.state.showCut
                  ?
                  <span>Hide </span>
                  :
                  <span>Show </span>
                }
                Cut Text
              </Button>
              {lines}
          </Col>
        </Row>
        <hr />
      </div>
    )
  }
}

CharacterShow.propTypes = {
  character: PropTypes.object.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
}

export default CharacterShow
