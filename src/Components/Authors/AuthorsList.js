import React, {
  Component
} from 'react'

import {
  Link
} from 'react-router-dom'

import {
  getAuthorNames
} from '../../api/authors'

class AuthorsList extends Component {
  state = {
    authors: [],
  }

  componentDidMount() {
    this.loadAuthorsFromServer()
  }

  async loadAuthorsFromServer() {
    const response = await getAuthorNames()
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error fetching authors'
      })
    } else {
      this.setState({
        authors: response.data
      })
    }
  }

  render() {
    let authors = this.state.authors.map(author =>
      <li key={author.id}> <Link to={`/authors/${author.id}`}>{author.first_name} {author.last_name}</Link></li>
    )
    return (
      <div>
        <ul>
          {authors}
        </ul>
        <Link to='/authors/new'>Add New</Link>
      </div>
    )
  }
}

export default AuthorsList