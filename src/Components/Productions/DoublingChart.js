import _ from 'lodash'
import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Table,
} from 'react-bootstrap'

import uuid from 'react-uuid'

import {
  getFrenchScenesFromPlay,
  getOnStagesFromAct,
  getOnStagesFromScene,
  getScenesFromPlay
} from '../../utils/playScriptUtils'

import {
  buildUserName
} from '../../utils/actorUtils'

import {
  filterEmptyContent,
} from '../../utils/playScriptUtils'

class DoublingChart extends Component {
  state={}

  getAllActors() {
    let castings = _.filter(this.props.production.jobs, function(job) {return job.character && !job.character.name.match(/Could Not Find Character/) && job.user_id})
    let actorsWithRepeats = _.chain(castings).map('user').value()
    return _.uniqBy(actorsWithRepeats, 'id')
  }

  getOnStages() {
    let onStages = []
    if (this.props.level == 'act') {
      filterEmptyContent(this.props.production.play.acts)
      .map((act) => {
        onStages.push(getOnStagesFromAct(act))
      })
    } else if (this.props.level == 'scene') {
      filterEmptyContent(this.props.production.play.acts)
      .map((act) =>
      {
        filterEmptyContent(act.scenes).map((scene) => {
          onStages.push(getOnStagesFromScene(scene))
        })
      })
    } else if (this.props.level == 'french_scene') {
      filterEmptyContent(this.props.production.play.acts).map((act) => {
        filterEmptyContent(act.scenes).map((scene) => {
          filterEmptyContent(scene.french_scenes).map((frenchScene) => {
            onStages.push(frenchScene.on_stages)
          })
        })
      })
    }
    return onStages
  }

  getJobsForActor(actor) {
    return _.filter(this.props.production.jobs, function(job) {
      return job.user_id === actor.id && job.specialization.title === 'Actor'
    })
  }

  generateColumns() {
    let headings = []
    if (this.props.level == 'act') {
      filterEmptyContent(this.props.production.play.acts)
      .map((act) => headings.push(`Act ${act.number}`))
    } else if (this.props.level == 'scene') {
      filterEmptyContent(getScenesFromPlay(this.props.production.play))
      .map((scene) => headings.push(scene.pretty_name))
    } else if (this.props.level == 'french_scene') {
      filterEmptyContent(getFrenchScenesFromPlay(this.props.production.play))
      .map((frenchScene) => headings.push(frenchScene.pretty_name))
    }
    return headings.map((heading) => <td key={uuid()}>{heading}</td>)
  }

  generateRow(actor) {
    let blocks = this.getOnStages()
    let actorJobs = this.getJobsForActor(actor)
    let actorCharacterIds = actorJobs.map((job) => job.character_id)
    let rowData = blocks.map((block) => {
      let blockCharacters = []
      let doublingProblem = ''
      block.map((onStage) => {
        if (_.includes(actorCharacterIds, onStage.character_id)){
          blockCharacters.push(onStage.character)
        }
      })
      let uniqBlockCharacters = _.uniqBy(blockCharacters, 'id')
      let blockCharactersNames = _.map(uniqBlockCharacters, 'name')
      if (uniqBlockCharacters.length > 1) {
        doublingProblem = 'doubling-problem'
      }
      return <td key={uuid()} className={doublingProblem}>{_.join(blockCharactersNames, ',')}</td>
    })
    let row = <tr key={uuid()}><td>{buildUserName(actor)}</td>{rowData}</tr>
    return row
  }

  generateUncastRow() {
    let blocks = this.getOnStages()
    let jobsThatAreNotCast = _.filter(this.props.production.jobs, function(job) {return job.character && !job.character.name.match(/Could Not Find Character/) && !job.user_id})
    let uncastCharacterIds = jobsThatAreNotCast.map((job) => job.character_id)
    let rowData = blocks.map((block) => {
      let blockCharacters = []
      block.map((onStage) => {
        if (_.includes(uncastCharacterIds, onStage.character_id)) {
          blockCharacters.push(onStage.character)
        }
      })
      let uniqBlockCharacters = _.uniqBy(blockCharacters, 'id')
      let blockCharactersNames = _.map(uniqBlockCharacters, 'name')
      return <td key={uuid()}>{_.join(blockCharactersNames, ',')}</td>
    })
    let row = <tr key={uuid()}><td>Still to cast</td>{rowData}</tr>
    return row
  }

  render() {
      let headRow = this.generateColumns()
      let actors = this.getAllActors()
      let rows = actors.map((actor) => this.generateRow(actor))
      let uncast = this.generateUncastRow()
      return (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Actor</td>{headRow}
            </tr>
          </thead>
          <tbody>
            {rows}
            {uncast}
          </tbody>
        </Table>
      )
    }
  }


DoublingChart.propTypes = {
  level: PropTypes.string.isRequired,
  production: PropTypes.object.isRequired,
}

export default DoublingChart
