import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import FrenchSceneForm from './FrenchSceneForm.js'

class FrenchSceneFormToggle extends Component { //opens form for create action
  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  handleFormSubmit = (frenchScene) => {
    this.toggleForm()
    this.props.onFormSubmit(frenchScene)
  }

  toggleForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    if (this.state.isOpen) {
      return (
        <FrenchSceneForm
          lastFrenchScene={this.props.lastFrenchScene}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.toggleForm}
          play={this.props.play}
          sceneId={this.props.sceneId}
        />
      );
    } else {
      return (
        <div>
          <Button variant="info"
            onClick={this.toggleForm}
          >
            Add New French Scene
          </Button>
        </div>
      );
    }
  }
}

FrenchSceneFormToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  lastFrenchScene: PropTypes.object,
  onFormSubmit: PropTypes.func.isRequired,
  play: PropTypes.object.isRequired,
  sceneId: PropTypes.number.isRequired,
}

export default FrenchSceneFormToggle
