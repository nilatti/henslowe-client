import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import _ from 'lodash'

import {buildUserName} from '../../utils/actorUtils'

import {
  getJobs,
} from '../../api/jobs'

class UserJobsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      user: this.props.user
    }
  }

  componentDidMount() {
    this.loadJobsFromServer()
  }

  castingGroupedByActor(castings) {
    let grouped = _.groupBy(castings, 'user_id')
    let actorIds = _.compact(Object.keys(grouped))
    return actorIds.map((actorId) => {
      if (actorId !== null) {
        let actor = _.find(this.state.availableActors, ['id', _.toNumber(actorId)])
        if (actor) {
          let actorName = buildUserName(actor)
          let actorGroup = grouped[actorId]
          let characters = actorGroup.map((item) => item.character)
          let characterNames = characters.map((character) => character.name)
          return <li key={actorId}>{actorName}: {_.join(characterNames, ', ')}</li>
        }
      }
    })
  }

  groupByTheater(jobs) {
    let grouped = _.groupBy(jobs, 'theater_id')
    let theaterIds = _.compact(Object.keys(grouped))
    return theaterIds.map((theaterId) => {
      if (theaterId !== null) {
        let theaterGroup = grouped[theaterId]
        let groupedByProduction = _.groupBy(theaterGroup, 'production_id')
        let productionIds = _.compact(Object.keys(groupedByProduction))
        let productionsForTheater = productionIds.map((productionId) => {
          if (productionId !== null) {
            let productionJobsString = `${groupedByProduction[productionId][0].production.play.title}: `
            let productionJobTitles = groupedByProduction[productionId].map((productionJob) => {
              if (productionJob.specialization.title === 'Actor' && productionJob.character) {
                return productionJob.character.name
              } else {
                return productionJob.specialization.title
              }
            })
            productionJobsString += _.join(productionJobTitles, ', ')
            return <li key={productionId}>{productionJobsString}</li>
          }
        })
        let theaterName = theaterGroup[0].theater.name
        return <li key={theaterId}>{theaterName}: <ul>{productionsForTheater}</ul>
          </li>
      }
    })
  }
  async loadJobsFromServer() {
   const response = await getJobs(
     {
       user_id: this.props.user.id
      }
    )
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching jobs'
      })
    } else {
      this.setState({
        jobs: _.orderBy(response.data, ['theater.name','production.id','specialization_id'])
      })
    }
  }

  render() {
    let test = this.groupByTheater(this.state.jobs)
    console.log(test)
    let jobs = this.state.jobs.map(job =>
      <li key={job.id}>
          {job.specialization.title} at {job.theater.name} <em>{job.production ? job.production.play.title : <></>}</em>
      </li>
    )
    return (
      <div>
        <ul>
          {test}
        </ul>
        <Link
          to={{
            pathname: '/jobs/new',
            state: {
              user: this.props.user,
            }
          }}
        >
          Add New
        </Link>
      </div>
    )
  }
}

UserJobsList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserJobsList
