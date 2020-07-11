import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import SpaceAgreementFormForSpaces from './SpaceAgreementFormForSpaces.js'

class SpaceAgreementFormForSpacesToggle extends Component { //opens form for create action
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
        <SpaceAgreementFormForSpaces
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
          space={this.props.space}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.handleFormOpen}
          >
            Add/Remove Theaters
          </Button>
        </div>
      );
    }
  }
}

SpaceAgreementFormForSpacesToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
}

export default SpaceAgreementFormForSpacesToggle
