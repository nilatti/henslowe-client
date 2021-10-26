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

import FrenchScene from './FrenchScene'

class Scene extends Component {
  render() {
    let scene = this.props.scene
    let french_scenes
    if (this.props.scene.french_scenes) {
      french_scenes = this.props.scene.french_scenes.map(french_scene =>
        <FrenchScene
          act_number={this.props.act_number}
          french_scene={french_scene}
          scene_number={this.props.scene.number}
          key={french_scene.number}
        />
      )
    } else {
      french_scenes = <div>Loading frech scenes</div>
    }
    return (
      <div id="scene-{scene.number}">
        {this.props.act_number}.{scene.number}
        {french_scenes}
      </div>
    )
  }
}

Scene.propTypes = {
  act_number: PropTypes.number.isRequired,
  scene: PropTypes.object.isRequired,
}

export default Scene
