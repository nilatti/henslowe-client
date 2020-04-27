import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getUsers
} from '../../api/users'

class UsersList extends Component {
  state = {
    users: [],
  }

  componentDidMount() {
    this.loadUsersFromServer()
  }

  async loadUsersFromServer() {
    const response = await getUsers()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching users'
      })
    } else {
      this.setState({
        users: response.data
      })
    }
  }

  render() {
    let users = this.state.users.map(user =>
      <li key={user.id}> <Link to={`/users/${user.id}`}>{user.preferred_name || user.first_name || user.email} {user.last_name}</Link></li>
    )
    return (
      <div>
        <ul>
          {users}
        </ul>
        <Link to='/users/new'>Add New</Link>
      </div>
    )
  }
}

export default UsersList
