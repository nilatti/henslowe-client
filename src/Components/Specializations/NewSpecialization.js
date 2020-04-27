import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import SpecializationForm from './SpecializationForm'

class NewSpecialization extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (specialization) => {
    this.handleFormClose()
    this.props.onFormSubmit(specialization)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-specialization-form">
            <SpecializationForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewSpecialization.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewSpecialization
