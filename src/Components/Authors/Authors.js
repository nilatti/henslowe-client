import React, {
  Component
} from 'react'
import {
  Col,
  Row
} from 'react-bootstrap'
import {
  Link,
  Route,
  Switch
} from 'react-router-dom'

import {
  createAuthor,
  deleteAuthor
} from '../../api/authors'
import AuthorsList from './AuthorsList'
import EditableAuthor from './EditableAuthor'
import NewAuthor from './NewAuthor'

class Authors extends Component {

  async createAuthor(author) {
    const response = await createAuthor(author)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating author'
      })
    } else {
      this.props.history.push(`/authors/${response.data.id}`)
      window.location.reload();
    }
  }

  async deleteAuthor(authorId) {
    const response = await deleteAuthor(authorId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting author'
      })
    } else {
      this.props.history.push('/authors')
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (author) => {
    this.createAuthor(author)
  }
  handleDeleteClick = (authorId) => {
    this.deleteAuthor(authorId)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="authors">
            <h2><Link to='/authors'>Authors</Link></h2>
            <hr />
              <Switch>
              <Route path='/authors/new' render={(props) => <NewAuthor {...props} onFormSubmit={this.handleCreateFormSubmit}/> } />
              <Route
                path={`/authors/:authorId`}
                render={(props) => (
                  <EditableAuthor
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path='/authors/' component={AuthorsList} />
              </Switch>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Authors