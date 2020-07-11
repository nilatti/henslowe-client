import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import ActForm from './ActForm.js'

class ActFormToggle extends Component { //opens form for create action
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

  handleFormSubmit = (act) => {
    this.handleFormClose()
    this.props.onFormSubmit(act)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <ActForm
          play={this.props.play}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add New Act
          </Button>
        </div>
      );
    }
  }
}

ActFormToggle.propTypes = {
  play: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default ActFormToggle
