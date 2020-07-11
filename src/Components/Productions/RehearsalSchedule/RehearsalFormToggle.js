import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
} from 'react-bootstrap'

import RehearsalForm from './RehearsalForm.js'

class RehearsalFormToggle extends Component { //opens form for create action
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
  handleFormSubmit = (rehearsal) => {
    this.handleFormClose()
    this.props.onFormSubmit(rehearsal)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <RehearsalForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.props.onFormSubmit}
          production={this.props.production}

        />
      );
    } else {
      return (
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New Rehearsal
          </Button>
      );
    }
  }
}

RehearsalFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  production: PropTypes.object.isRequired,
}

export default RehearsalFormToggle
