import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {ProductionAuthContext} from '../Contexts'
import {buildUserName} from '../../utils/actorUtils'

class JobsListExcludingActorsAndAuditioners extends Component {
  excludeActorsAndAuditioners() {
    return this.props.production.jobs.filter(job => job.specialization.title !== 'Actor' && job.specialization.title !== 'Auditioner')
  }
  render() {
    let productionSet = this.props.production !== undefined ? true : false
    let jobs = this.excludeActorsAndAuditioners().map(job =>
      <li key={job.id}>
        {job.user ? buildUserName(job.user) : <></>}
          : {job.specialization.title}
      </li>
    )
    return (
      <div>
        <ul>
          {jobs}
        </ul>
        <ProductionAuthContext.Consumer>
        {(value) => {
          if (value === 'admin') {
            return (
              <Link
                to={{
                  pathname: '/jobs/new',
                  state: {
                    production: this.props.production,
                    productionSet: productionSet,
                    theater: this.props.theater,
                  }
                }}
              >
                Add New
              </Link>
            )
          }
        }}
        </ProductionAuthContext.Consumer>
      </div>
    )
  }
}

JobsListExcludingActorsAndAuditioners.propTypes = {
  production: PropTypes.object.isRequired,
}

export default JobsListExcludingActorsAndAuditioners
