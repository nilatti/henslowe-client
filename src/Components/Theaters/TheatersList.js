import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getTheaterNames
} from '../../api/theaters'

class TheatersList extends Component {
  state = {
    theaters: [],
  }

  componentDidMount() {
    this.loadTheatersFromServer()
  }

  async loadTheatersFromServer() {
    const response = await getTheaterNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching theaters'
      })
    } else {
      this.setState({
        theaters: response.data
      })
    }
  }

  render() {
    let theaters = this.state.theaters.map(theater =>
      <li key={theater.id}> <Link to={`/theaters/${theater.id}`}>{theater.name}</Link></li>
    )
    return (
      <div>
        <ul>
          {theaters}
        </ul>
        <Link to='/theaters/new'>Add New</Link>
      </div>
    )
  }
}

export default TheatersList