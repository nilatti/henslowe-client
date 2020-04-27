import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  buildUserName
} from '../../utils/actorUtils'

class AuditionersList extends Component {
  getAuditioners() {
    let auditioners = this.props.production.jobs.filter(job => job.specialization.title === 'Auditioner')
    return _.sortBy(auditioners, [function(o) { return o.user.first_name; }])
  }
  render() {
    let productionSet = this.props.production !== undefined ? true : false
    let jobs = this.getAuditioners().map(job =>
      <li key={job.id}>
        {job.user ? buildUserName(job.user) : ''}
      </li>
    )
    return (
      <div>
        <ul>
          {jobs}
        </ul>
        <Link
          to={{
            pathname: '/jobs/new',
            state: {
              production: this.props.production,
              productionSet: productionSet,
              theater: this.props.theater,
              specializationId: 4,
              specializationName: 'Auditioner', //tk get rid of this hard coding, it is ugly
            }
          }}
        >
          Add New Auditioner
        </Link>
      </div>
    )
  }
}

AuditionersList.propTypes = {
  production: PropTypes.object.isRequired,
}

export default AuditionersList
