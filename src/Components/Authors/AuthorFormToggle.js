import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button
} from 'react-bootstrap'

import AuthorForm from './AuthorForm.js'

class AuthorFormToggle extends Component { //opens form for create action
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }
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
    if (this.state.isOpen) {
      return (
        <AuthorForm
          birthdate={this.props.birthdate}
          deathdate={this.props.deathdate}
          first_name={this.props.first_name}
          gender={this.props.gender}
          id={this.props.id}
          last_name={this.props.last_name}
          middle_name={this.props.middle_name}
          nationality={this.props.nationality}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
          plays={this.props.plays}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New Author
          </Button>
        </div>
      );
    }
  }
}

AuthorFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default AuthorFormToggle