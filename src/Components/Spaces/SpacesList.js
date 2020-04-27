import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getSpaceNames
} from '../../api/spaces'

class SpacesList extends Component {
  state = {
    spaces: [],
  }

  componentDidMount() {
    this.loadSpacesFromServer()
  }

  async loadSpacesFromServer() {
    const response = await getSpaceNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching spaces'
      })
    } else {
      this.setState({
        spaces: response.data
      })
    }
  }

  render() {
    let spaces = this.state.spaces.map(space =>
      <li key={space.id}> <Link to={`/spaces/${space.id}`}>{space.name}</Link></li>
    )
    return (
      <div>
        <ul>
          {spaces}
        </ul>
        <Link to='/spaces/new'>Add New</Link>
      </div>
    )
  }
}

export default SpacesList