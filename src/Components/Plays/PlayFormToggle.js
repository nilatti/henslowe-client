import {
  Button,
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import PlayForm from './PlayForm.js'

class PlayFormToggle extends Component { //opens form for create action
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

  handleFormSubmit = (play) => {
    this.handleFormClose()
    this.props.onFormSubmit(play)
  }

  render() {
    if (this.state.isOpen) {
      return (
        <PlayForm
          author_id={this.props.author_id}
          isOnAuthorPage={this.props.isOnAuthorPage}
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
            Add New Play
          </Button>
        </div>
      );
    }
  }
}

PlayFormToggle.propTypes = {
  isOnAuthorPage: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
}

export default PlayFormToggle