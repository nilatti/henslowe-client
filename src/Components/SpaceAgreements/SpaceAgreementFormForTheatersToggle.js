import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import SpaceAgreementFormForTheaters from './SpaceAgreementFormForTheaters.js'

class SpaceAgreementFormForTheatersToggle extends Component { //opens form for create action
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

  handleFormSubmit = (space_agreements) => {
    this.handleFormClose()
    this.props.onFormSubmit(space_agreements)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <SpaceAgreementFormForTheaters
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
          theater={this.props.theater}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Edit Spaces
          </Button>
        </div>
      );
    }
  }
}

SpaceAgreementFormForTheatersToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default SpaceAgreementFormForTheatersToggle