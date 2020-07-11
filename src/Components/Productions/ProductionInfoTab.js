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

class ProductionInfoTab extends Component {
  render() {
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="production-profile">
          <h2><Link to={`/productions/${this.props.production.id}`}>{this.props.production.play ? this.props.production.play.title : 'A play'}</Link></h2>
          <p>{this.props.production.start_date} - {this.props.production.end_date}</p>
        </Col>
      </Row>
      <hr />
      </Col>
    )
  }
}

ProductionInfoTab.propTypes = {
  production: PropTypes.object.isRequired,
}

export default ProductionInfoTab
