import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getUsers
} from '../../api/users'

import {buildUserName} from '../../utils/actorUtils'

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
        users: response.data.filter(user => !user.fake)
      })
    }
  }

  render() {
    let users = this.state.users.map(user =>
      <li key={user.id}> <Link to={`/users/${user.id}`}>{buildUserName(user)}</Link></li>
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
