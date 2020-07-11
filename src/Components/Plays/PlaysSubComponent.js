import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

class PlaysSubComponent extends Component {

  render() {
    const plays = this.props.plays.map((play) => (
      <li key={play.id}>
        <Link to={`/plays/${play.id}`}>
          {play.title}
        </Link>
      </li>
    ))

    return (
      <div id='plays'>
        <ul>
          {plays}
        </ul>
      </div>
    )
  }
}

PlaysSubComponent.propTypes = {
  plays: PropTypes.array.isRequired,
}

export default PlaysSubComponent