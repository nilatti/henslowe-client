import _ from 'lodash'

import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'

import {
  getItem,
} from '../../api/crud'

import DoublingChart from './DoublingChart'

class DoublingCharts extends Component {
  state={}

  componentDidMount = () => {
    this.loadProductionFromServer(this.props.match.params.id)
  }

  getAllActors() {
    let castings = _.filter(this.state.production.jobs, function(job) {return job.character && !job.character.name.match(/Could Not Find Character/)})
    let actorsWithRepeats = _.chain(castings).map('user').value()
    return _.uniqBy(actorsWithRepeats, 'id')
  }

  getJobsForActor(actor) {
    let uncastRemoved = this.state.production.jobs.map((job) => {
      if (job.user_id !== null && job.specialization_id === 2) {  //again, don't like the hard coding here where actor = 2
        return job
      } else {
        return
      }
    })
    return _.compact(uncastRemoved)
  }

  async loadProductionFromServer(productionId) {
    const response = await getItem(productionId, 'production')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching production'
      })
    } else {
      this.setState({
        production: response.data
      })
    }
  }

  render() {
    if (this.state.production) {
      let actors = this.getAllActors()
      actors = actors.map((actor) => {
        let jobs = this.getJobsForActor(actor)
        return {
          ...actor,
          jobs: jobs}
        })
      return (
        <Row>
          <Col md={12}>
            <Link to={`/productions/${this.props.match.params.id}`}>{this.state.production.play.title} at {this.state.production.theater.name}</Link>
            <Tabs>
              <Tab eventKey="acts" title="Acts">
                <DoublingChart
                  level='act'
                  production={this.state.production}
                />
              </Tab>
              <Tab eventKey="scenes" title="Scenes">
                <DoublingChart
                  level='scene'
                  production={this.state.production}
                />
              </Tab>
              <Tab eventKey="french_scenes" title="French Scenes">
              <DoublingChart
                level='french_scene'
                production={this.state.production}
              />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      )
    }
    return (
      <h2>Loading doubling charts</h2>
    )

  }
}

DoublingCharts.propTypes = {

}

export default DoublingCharts
