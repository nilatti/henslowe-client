import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import NewProductionForm from './NewProductionForm'

class NewProduction extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (production) => {
    this.handleFormClose()
    this.props.onFormSubmit(production)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-production-form">
            <NewProductionForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewProduction.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewProduction
