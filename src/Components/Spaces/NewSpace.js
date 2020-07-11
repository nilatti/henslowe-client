import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import SpaceForm from './SpaceForm'

class NewSpace extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }

  handleFormSubmit = (space) => {
    this.handleFormClose()
    this.props.onFormSubmit(space)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-space-form">
            <SpaceForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewSpace.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewSpace