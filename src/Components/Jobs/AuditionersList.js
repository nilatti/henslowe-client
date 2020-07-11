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

import {
  getSpecializations
} from '../../api/specializations'

class AuditionersList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    this.loadSpecializationsFromServer()
  }
  getAuditioners() {
    let auditioners = this.props.production.jobs.filter(job => job.specialization.title === 'Auditioner')
    return _.sortBy(auditioners, [function(o) { return o.user.first_name; }])
  }

  async loadSpecializationsFromServer() {
    const response = await getSpecializations()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching specializations'
      })
    } else {
      this.setState({
        auditionerSpecialization: response.data.filter(specialization => specialization.title == 'Auditioner')[0]
      })
    }
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
              theater: this.props.theater,
              specialization: this.state.auditionerSpecialization,
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
