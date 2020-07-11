import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import SceneForm from './SceneForm.js'

class SceneFormToggle extends Component { //opens form for create action
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormSubmit = (act) => {
    this.toggleForm()
    this.props.onFormSubmit(act)
  }

  toggleForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    if (this.state.isOpen) {
      return (
        <SceneForm
          actId={this.props.actId}
          onFormSubmit={this.props.onFormSubmit}
          onFormClose={this.toggleForm}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.toggleForm}
          >
            Add New Scene
          </Button>
        </div>
      );
    }
  }
}

SceneFormToggle.propTypes = {
  actId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default SceneFormToggle
