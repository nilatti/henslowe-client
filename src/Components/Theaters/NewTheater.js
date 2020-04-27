import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import TheaterForm from './TheaterForm'

class NewTheater extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }
  handleFormSubmit = (theater) => {
    this.handleFormClose()
    this.props.onFormSubmit(theater)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-theater-form">
            <TheaterForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewTheater.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewTheater