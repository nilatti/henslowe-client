import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Col,
} from 'react-bootstrap'

import _ from 'lodash'

import {sortUsers} from '../../../utils/actorUtils'

import ActorShow from './ActorShow'
import ActorTrack from './ActorTrack'


class ActorsList extends Component {
  getActorJobs() {
    return this.props.production.jobs.filter(job => job.specialization.title === 'Actor').filter(job => job.user)
  }

  getUniqActors() {
    let allJobs = this.getActorJobs()
    if (allJobs.length > 0){
      let uniqActors = {}
      _.forEach(allJobs, function(job) {
        if (!uniqActors.hasOwnProperty(job.user.id)) {
          uniqActors[job.user.id] = {
            actor: job.user,
            jobs: [job]
          }
        } else {
          uniqActors[job.user.id]['jobs'].push(job)
        }
      })

      uniqActors = sortUsers(uniqActors)

      return uniqActors
    } else {
      return {}
    }

  }

  render() {
    let actorObjs = Object.values(this.getUniqActors())
    let actors = actorObjs.map((obj) =>
      <li key={obj.actor.id}>
        <ActorShow
          actorObj={obj}
          production={this.props.production}
        />
      </li>
    )
    return (
      <Col md={12}>
        <h2>Actors</h2>
        <ul>
          {actors}
        </ul>
      </Col>
    )
  }
}

ActorsList.propTypes = {
  production: PropTypes.object.isRequired,
}

export default ActorsList
