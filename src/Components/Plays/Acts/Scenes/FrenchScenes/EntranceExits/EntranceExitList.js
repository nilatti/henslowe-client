import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {Button} from 'react-bootstrap'

import _ from 'lodash'

import EntranceExitShow from './EntranceExitShow'
import NewEntranceExitForm from './NewEntranceExitForm'

class EntranceExitsList extends Component {
  state = {
    newEntranceExitFormOpen: false,
    entranceExits: [],
  }

  toggleForm = () => {
    this.setState({newEntranceExitFormOpen: !this.state.newEntranceExitFormOpen})
  }

  render() {
    let act = _.find(this.props.play.acts, {'id': this.props.actId})
    let scene = _.find(act.scenes, {'id': this.props.sceneId})
    let frenchScene = _.find(scene.french_scenes, {'id': this.props.frenchSceneId})
    let entranceExits = <tr><td colSpan="6">'No entrances or exits listed'</td></tr>
    if (frenchScene.entrance_exits[0]) {
      let orderedEntranceExits = _.orderBy(frenchScene.entrance_exits, 'line')
      entranceExits = orderedEntranceExits.map(entranceExit =>
        <EntranceExitShow
          actId={this.props.actId}
          entranceExit={entranceExit}
          frenchSceneId={this.props.frenchSceneId}
          key={entranceExit.id}
          onDeleteClick={this.props.onDeleteClick}
          onEdit={this.props.handleEntranceExitEditFormSubmit}
          play={this.props.play}
          production={this.props.production}
          sceneId={this.props.sceneId}
        />
      )
    }

    return (
      <div className="col">
        {
          entranceExits ?
          <div className="table=responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    Line
                  </th>
                  <th>
                    Page
                  </th>
                  <th>
                    Characters
                  </th>
                  <th>
                    Enter or Exit?
                  </th>
                  <th>
                    Stage Exit
                  </th>
                  <th>
                    Notes
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                {entranceExits}
              </tbody>
            </table>
          </div>
          :
          <span></span>
        }

        { this.state.newEntranceExitFormOpen ?
          <NewEntranceExitForm
            actId={this.props.actId}
            characters={this.props.play.characters}
            frenchSceneId={this.props.frenchSceneId}
            onFormClose={this.toggleForm}
            onFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
            sceneId={this.props.sceneId}
            stageExits={this.props.production.stage_exits}
          />
          :
          <Button
            onClick={this.toggleForm}
          >
            Add New Entrance Exit
          </Button>
        }

      </div>
    )
  }
}

EntranceExitsList.propTypes = {
  actId: PropTypes.number.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
  handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  production: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
}

export default EntranceExitsList
