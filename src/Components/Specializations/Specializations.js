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
  createSpecialization,
  deleteSpecialization
} from '../../api/specializations'
import SpecializationsList from './SpecializationsList'
import EditableSpecialization from './EditableSpecialization'
import NewSpecialization from './NewSpecialization'

class Specializations extends Component {

  async createSpecialization(specialization) {
    const response = await createSpecialization(specialization)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating Specialization'
      })
    } else {
      this.props.history.push(`/specializations/${response.data.id}`)
      window.location.reload();
    }
  }

  async deleteSpecialization(specializationId) {
    const response = await deleteSpecialization(specializationId)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting Specialization'
      })
    } else {
      this.props.history.push('/specializations')
      window.location.reload();
    }
  }

  handleCreateFormSubmit = (specialization) => {
    this.createSpecialization(specialization)
  }
  handleDeleteClick = (specializationId) => {
    this.deleteSpecialization(specializationId)
  }

  render() {
    return (
      <Row>
        <Col md={12} >
          <div id="specializations">
            <h2><Link to='/specializations'>Specializations</Link></h2>
            <hr />
              <Switch>
              <Route path='/specializations/new' render={(props) => <NewSpecialization {...props} onFormSubmit={this.handleCreateFormSubmit}/> } />
              <Route
                path={`/specializations/:specializationId`}
                render={(props) => (
                  <EditableSpecialization
                    {...props}
                    onDeleteClick={this.handleDeleteClick}
                  />
                )}
              />
              <Route path='/specializations/' component={SpecializationsList} />
              </Switch>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Specializations
