import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
  Table,
} from 'react-bootstrap'

import _ from 'lodash'

class ActorTrack extends Component {
  getActorEntranceExits() {
    let actorRoles = this.props.roles.map(role => role.character.id)
    let allEntranceExits = this.props.production.play.acts.map(act =>
      act.scenes.map(scene =>
        act.scenes.map(scene =>
          scene.french_scenes.map(french_scene =>
            french_scene.entrance_exits
    ))))
    allEntranceExits = _.flattenDepth(allEntranceExits, 4)
    let actorEntranceExits = allEntranceExits.filter(function(entranceExit) {
      return actorRoles.includes(entranceExit.character_id)
    })
    actorEntranceExits = _.uniq(actorEntranceExits)
    actorEntranceExits = actorEntranceExits.map(entranceExit =>
      ({...entranceExit,
        frenchScene: entranceExit.french_scene.number,
        scene: entranceExit.french_scene.scene.number,
        act: entranceExit.french_scene.scene.act.number
      })
    )
    actorEntranceExits = _.orderBy(actorEntranceExits, ['act', 'scene', 'frenchScene', 'line', 'category'])
    return actorEntranceExits
  }

  getCharacter(characterId) {
    return this.props.production.play.characters.find(x => x.id === characterId)
  }

  getStageExit(stageExitId) {
    return this.props.production.stage_exits.find(x => x.id === stageExitId)
  }

  render() {
    const actorEntranceExits = this.getActorEntranceExits()
    let actorTrackInfo = actorEntranceExits.map(entranceExit =>
      (
        <tr key={entranceExit.id}>
          <td>
            {entranceExit.act}
          </td>
          <td>
            {entranceExit.scene}
          </td>
          <td>
            {entranceExit.line ? entranceExit.line : ''}
          </td>
          <td>
            {entranceExit.page ? entranceExit.page : ''}
          </td>
          <td>
            {entranceExit.category}
          </td>
          <td>
            {this.getStageExit(entranceExit.stage_exit_id).name}
          </td>
          <td>
            {this.getCharacter(entranceExit.character_id).name}
          </td>
          <td>
            {entranceExit.notes ? entranceExit.notes : ''}
          </td>
        </tr>
      )
    )
    return (
      <Col md={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                Act
              </th>
              <th>
                Scene
              </th>
              <th>
                Line
              </th>
              <th>
                Page
              </th>
              <th>
                Direction
              </th>
              <th>
                Stage Exit
              </th>
              <th>
                Character
              </th>
              <th>
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {actorTrackInfo}
          </tbody>
        </Table>
      </Col>
    )
  }
}

ActorTrack.propTypes = {
  production: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
}

export default ActorTrack
