import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import JobsList from '../Jobs/JobsList'

class SpecializationShow extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.specialization.id)
  }

  render() {
    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="specialization-profile">
          <h2>{this.props.specialization.title}</h2>
          <p><em>{this.props.specialization.description}</em></p>
          <span
            className='right floated edit icon'
            onClick={this.props.onEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className='right floated trash icon'
            onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Col>
      </Row>
      <Row>
        <JobsList specialization_id={this.props.specialization.id} />
      </Row>
      </Col>
    )
  }
}

SpecializationShow.propTypes = {
  specialization: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default SpecializationShow
