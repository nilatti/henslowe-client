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
  createSpace,
  deleteSpace
} from '../../api/spaces'

import SpacesList from './SpacesList'
import EditableSpace from './EditableSpace'
import NewSpace from './NewSpace'

class Spaces extends Component {

  async createSpace(space) {
    const response = await createSpace(space)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating Space'
      })
    } else {
      this.props.history.push(`/spaces/${response.data.id}`)
      window.location.reload();
    }
  }

  async deleteSpace(spaceId) {
    const response = await deleteSpace(spaceId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting Space'
      })
    } else {
      this.props.history.push('/spaces')
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (space) => {
    this.createSpace(space)
  }
  handleDeleteClick = (spaceId) => {
    this.deleteSpace(spaceId)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="spaces">
            <h2><Link to='/spaces'>Spaces</Link></h2>
            <hr />
              <Switch>
              <Route path='/spaces/new' render={(props) => <NewSpace {...props} onFormSubmit={this.handleCreateFormSubmit}/> } />
              <Route
                path={`/spaces/:spaceId`}
                render={(props) => (
                  <EditableSpace
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path='/spaces/' component={SpacesList} />
              </Switch>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Spaces
