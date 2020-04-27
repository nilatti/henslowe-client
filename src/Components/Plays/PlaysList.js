import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getPlayTitles
} from '../../api/plays'

class PlaysList extends Component {
  state = {
    plays: [],
  }

  componentDidMount() {
    this.loadPlaysFromServer()
  }

  async loadPlaysFromServer() {
    const response = await getPlayTitles()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching plays'
      })
    } else {
      this.setState({
        plays: response.data
      })
    }
  }

  render() {
    let plays = this.state.plays.map(play =>
      <li key={play.id}> <Link to={`/plays/${play.id}`}>{play.title}</Link></li>
    )
    return (
      <div>
        <ul>
          {plays}
        </ul>
        <Link to='/plays/new'>Add New</Link>
      </div>
    )
  }
}

export default PlaysList