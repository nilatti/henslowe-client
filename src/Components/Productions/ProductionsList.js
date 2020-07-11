import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

import {
  getProductionNames
} from '../../api/productions'

class ProductionsList extends Component {
  state = {
    productions: [],
  }

  componentDidMount() {
    this.loadProductionsFromServer()
  }

  async loadProductionsFromServer() {
    const response = await getProductionNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching productions'
      })
    } else {
      this.setState({
        productions: response.data
      })
    }
  }

  render() {
    let productions = this.state.productions.map(production =>
      <li key={production.id}> <Link to={`/productions/${production.id}`}>{production.play ? production.play.title : 'A play'} at {production.theater.name || 'A theater'}</Link></li>
    )
    return (
      <div>
        <ul>
          {productions}
        </ul>
        <Link to='/productions/new'>Add New</Link>
      </div>
    )
  }
}

export default ProductionsList
