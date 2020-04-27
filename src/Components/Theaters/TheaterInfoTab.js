import PropTypes from 'prop-types'
import React, {
  Component
} from 'react'

import {
  Col,
  Row,
} from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'
// import SpaceSubcomponent from './SpaceSubcomponent.js'

class TheaterInfoTab extends Component {
  render() {
    return (
      <Row>
        <Col md={12} className="theater-profile">
          <h2><Link to={`/theaters/${this.props.theater.id}`}>{this.props.theater.name}</Link></h2>
          <p><em>{this.props.theater.mission_statement}</em></p>
          <p>
          {this.props.theater.street_address}<br />
          {this.props.theater.city}, {this.props.theater.state}  {this.props.theater.zip}<br />
          {this.props.theater.phone_number}<br />
          <a href={'http://' + this.props.theater.website} target="_blank">{this.props.theater.website}</a>
          </p>
          </Col>
          </Row>
    )
  }
}

TheaterInfoTab.propTypes = {
  theater: PropTypes.object.isRequired,
}

export default TheaterInfoTab