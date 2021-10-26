import React, {
  Component
} from 'react'
import PropTypes from 'prop-types';
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import {sortLines} from '../../utils/playScriptUtils'

class FrenchScene extends Component {
  render() {
    let lines = sortLines(this.props.french_scene.lines.concat(this.props.french_scene.stage_directions))
    let french_scene = this.props.french_scene
    return (
      <div id="french-scene-{french_scene.number}">
        {this.props.act_number}.{this.props.scene_number}.{french_scene.number}
      </div>
    )
  }
}

FrenchScene.propTypes = {
  act_number: PropTypes.number.isRequired,
  french_scene: PropTypes.object.isRequired,
  scene_number: PropTypes.number.isRequired,
}

export default FrenchScene
