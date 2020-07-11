import PropTypes from 'prop-types';

import React, {
  Component
} from 'react'

import {
  Col,
  Row
} from 'react-bootstrap'

import AuthorForm from './AuthorForm'

class NewAuthor extends Component {

  handleFormClose = () => {
    this.setState({
      isOpen: false
    })
  }
  handleFormSubmit = (author) => {
    this.handleFormClose()
    this.props.onFormSubmit(author)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="new-author-form">
            <AuthorForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
             />
          </div>
        </Col>
      </Row>
    )
  }
}

NewAuthor.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}


export default NewAuthor