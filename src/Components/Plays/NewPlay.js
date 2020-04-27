import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import PlayForm from './PlayForm'

class NewPlay extends Component {

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
          <div id="new-play-form">
            <PlayForm
            isOnAuthorPage={false} 
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewPlay.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewPlay