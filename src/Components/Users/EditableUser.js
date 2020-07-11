import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'

import {
  getUser,
  updateServerUser
} from '../../api/users'

import UserForm from './UserForm'
import UserShow from './UserShow'

import {getOverlap} from '../../utils/authorizationUtils'
import {UserAuthContext} from '../Contexts'

class EditableUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editFormOpen: false,
      user: null,
    }
  }

  closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  }

  componentDidMount = () => {
    this.loadUserFromServer(this.props.match.params.userId)
  }
  componentDidUpdate(prevProps) {
    if (this.state.user === null || prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadUserFromServer(this.props.match.params.userId);
    }
  }

  handleEditClick = () => {
    this.openForm()
  }
  handleFormClose = () => {
    this.closeForm()
  }

  handleSubmit = (user) => {
    this.updateUserOnServer(user)
    this.handleFormClose()
  }

  async loadUserFromServer(userId) {
    const response = await getUser(userId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching user'
      })
    } else {
      let user = JSON.parse(window.localStorage.getItem('user'))
      if (user) {
        this.setState({userRole: getOverlap(user, response.data)})
      }
      this.setState({
        user: response.data
      })
    }
  }

  async updateUserOnServer(user) {
    const response = await updateServerUser(user)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating user'
      })
    } else {
      this.setState({
        user: response.data
      })
    }
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        User: null,
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
    if (this.state.user === null) {
      return (
        <div>Loading!</div>
      )
    }
    if (this.state.editFormOpen) {
      return (
        <UserForm
          user={this.state.user}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
          isOpen={true}
        />
      )
    } else {
      return (
        <UserAuthContext.Provider
          value={this.state.userRole}
        >
          <UserShow
            user={this.state.user}
            onEditClick={this.handleEditClick}
            onDeleteClick={this.props.onDeleteClick}
            onFormSubmit={this.handleSubmit}
          />
        </ UserAuthContext.Provider>
      )
    }
  }
}

EditableUser.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default EditableUser
