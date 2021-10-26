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

import Scene from './Scene'

class Act extends Component {
  render() {

    let act = this.props.act
    let scenes
    if (this.props.act.scenes) {
      scenes = this.props.act.scenes.map(scene =>
        <Scene
          act_number={this.props.act.number}
          key={scene.number}
          scene={scene}
        />
      )
    } else {
      scenes = <div>Loading scenes</div>
    }
    return (
      <div id="act-{act.number}">
        {act.heading}
        {scenes}
      </div>
    )
  }
}

Act.propTypes = {
  act: PropTypes.object.isRequired
}

export default Act
