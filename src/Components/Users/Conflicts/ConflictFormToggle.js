import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
} from 'react-bootstrap'

import ConflictForm from './ConflictForm.js'

class ConflictFormToggle extends Component { //opens form for create action
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
  handleFormSubmit = (conflict) => {
    this.handleFormClose()
    this.props.onFormSubmit(conflict)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <ConflictForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.props.onFormSubmit}
          user={this.props.user}

        />
      );
    } else {
      return (
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New Conflict
          </Button>
      );
    }
  }
}

ConflictFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ConflictFormToggle
