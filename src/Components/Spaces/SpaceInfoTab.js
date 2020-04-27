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

class SpaceInfoTab extends Component {
  render() {
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="space-profile">
          <h2><Link to={`/spaces/${this.props.space.id}`}>{this.props.space.name}</Link></h2>
          <p><em>{this.props.space.mission_statement}</em></p>
          <p>
          {this.props.space.street_address}<br />
          {this.props.space.city}, {this.props.space.state}  {this.props.space.zip}<br />
          {this.props.phone_number}<br />
          <a href={'http://' + this.props.space.website} target="_blank">{this.props.space.website}</a>
          </p>
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

SpaceInfoTab.propTypes = {
  space: PropTypes.object.isRequired,
}

export default SpaceInfoTab