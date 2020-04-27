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
  createTheater,
  deleteTheater
} from '../../api/theaters'
import TheatersList from './TheatersList'
import EditableTheater from './EditableTheater'
import NewTheater from './NewTheater'

class Theaters extends Component {

  async createTheater(theater) {
    const response = await createTheater(theater)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating Theater'
      })
    } else {
      this.props.history.push(`/theaters/${response.data.id}`)
      window.location.reload();
    }
  }

  async deleteTheater(theaterId) {
    const response = await deleteTheater(theaterId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting Theater'
      })
    } else {
      this.props.history.push('/theaters')
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (theater) => {
    this.createTheater(theater)
  }
  handleDeleteClick = (theaterId) => {
    this.deleteTheater(theaterId)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="theaters">
            <h2><Link to='/theaters'>Theaters</Link></h2>
            <hr />
              <Switch>
              <Route path='/theaters/new' render={(props) => <NewTheater {...props} onFormSubmit={this.handleCreateFormSubmit}/> } />
              <Route
                path={`/theaters/:theaterId`}
                render={(props) => (
                  <EditableTheater
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path='/theaters/' component={TheatersList} />
              </Switch>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Theaters