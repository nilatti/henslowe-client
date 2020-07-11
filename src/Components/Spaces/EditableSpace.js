import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getSpace,
  updateServerSpace
} from '../../api/spaces'

import SpaceForm from './SpaceForm'
import SpaceShow from './SpaceShow'

import {getUserRoleForSpace} from '../../utils/authorizationUtils'
import {SpaceAuthContext} from '../Contexts'

class EditableSpace extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      space: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadSpaceFromServer(this.props.match.params.spaceId)
  }

  componentDidUpdate(prevProps) {
    if (this.state.space === null || prevProps.match.params.spaceId !== this.props.match.params.spaceId) {
      this.loadSpaceFromServer(this.props.match.params.spaceId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (space) => {
    this.updateSpaceOnServer(space)
    this.closeForm()
  }

  async loadSpaceFromServer(spaceId) {
    const response = await getSpace(spaceId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching space'
      })
    } else {
      let user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
          this.setState({userRole: getUserRoleForSpace(user, response.data)})
        }
      this.setState({
        space: response.data
      })
    }
  }

  async updateSpaceOnServer(space) {
    const response = await updateServerSpace(space)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating space'
      })
    } else {
      this.setState({
        space: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        Space: null,
        prevId: props.id,
      };
    }
    // No state update necessary
    return null;
  }

  openForm = () => {
    this.setState({
      editFormOpen: true
    })
  }

  render() {
    if (this.state.space === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (

          <SpaceForm
            space={this.state.space}
            onFormSubmit={this.handleSubmit}
            onFormClose={this.handleFormClose}
            isOpen={true}
          />
      )
    } else {
      return (
        <SpaceAuthContext.Provider
        value={this.state.userRole}>
          <SpaceShow
          space={this.state.space}
          onEditClick={this.handleEditClick}
          onDeleteClick={this.props.onDeleteClick}
          onFormSubmit={this.handleSubmit}
          />
        </SpaceAuthContext.Provider>
      )
    }
  }
}

EditableSpace.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableSpace
