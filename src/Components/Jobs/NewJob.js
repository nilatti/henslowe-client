import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import JobForm from './JobForm'

class NewJob extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (job) => {
    this.handleFormClose()
    this.props.onFormSubmit(job)
  }

  render() {
    let production
    let productionSet
    let specializationId
    let specializationName
    let theater
    let user
    if (this.props.location.state){
      production = this.props.location.state.production
      productionSet = this.props.location.state.productionSet
      specializationId = this.props.location.state.specializationId
      specializationName = this.props.location.state.specializationName
      theater = this.props.location.state.theater
      user = this.props.location.state.user
    } else {
      production = ''
      productionSet = false
      theater = ''
      user = ''
    }

    return (
      <Row>
        <Col md={12} >
          <div id="new-job-form">
            <JobForm
            production={production}
            productionSet={productionSet}
            specializationId={specializationId}
            specializationName={specializationName}
            theater={theater}
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
            user={user}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewJob.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewJob
