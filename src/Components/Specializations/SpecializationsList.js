import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getSpecializations
} from '../../api/specializations'

class SpecializationsList extends Component {
  state = {
    specializations: [],
  }

  componentDidMount() {
    this.loadSpecializationsFromServer()
  }

  async loadSpecializationsFromServer() {
    const response = await getSpecializations()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching specializations'
      })
    } else {
      this.setState({
        specializations: response.data
      })
    }
  }

  render() {
    let specializations = this.state.specializations.map(specialization =>
      <li key={specialization.id}> <Link to={`/specializations/${specialization.id}`}>{specialization.title}</Link></li>
    )
    return (
      <div>
        <ul>
          {specializations}
        </ul>
        <Link to='/specializations/new'>Add New</Link>
      </div>
    )
  }
}

export default SpecializationsList
