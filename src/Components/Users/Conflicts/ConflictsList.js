import _ from 'lodash'
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import {
  createItemWithParent,
  deleteItem,
  updateServerItem
} from '../../../api/crud'

import ConflictFormToggle from './ConflictFormToggle'
import EditableConflict from './EditableConflict'

class ConflictsList extends Component {
  constructor(props) {
    super(props)
    let conflicts = _.sortBy(this.props.user.conflicts, function(conflict) {
      return new Date(conflict.start_time);
    });
    this.state = {
      conflicts: conflicts,
    }
  }

  handleConflictCreate = (conflict) => {
    this.createConflict(this.props.user.id, conflict)
  }

  handleConflictDelete = (conflictId) => {
    this.deleteConflict(conflictId)
  }

  handleConflictEdit = (conflict) => {
    this.updateConflict(conflict)
  }

  async createConflict(userId, conflict) {
    const response = await createItemWithParent('user', userId, 'conflict', conflict)
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error creating character'
      })
    } else {
      let newConflicts = _.sortBy([...this.state.conflicts, response.data], function(conflict) {
        return new Date(conflict.start_time);
      });
      this.setState({
        conflicts: newConflicts
      })
    }
  }

  async deleteConflict(conflictId) {
    const response = await deleteItem(conflictId, 'conflict')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error deleting conflict'
      })
    } else {
      this.setState({
        conflicts: this.state.conflicts.filter(conflict => conflict.id !== conflictId)
      })
    }
  }

  async updateConflict(updatedConflict) {
    const response = await updateServerItem(updatedConflict, 'conflict')
    if (response.status >= 400) {
      this.setState({
        errorStatus: 'Error updating conflict'
      })
    } else {
      let newConflicts = this.state.conflicts.map((conflict) => {
        if (conflict.id === updatedConflict.id) {
          return {...conflict, ...updatedConflict}
        } else {
          return conflict
        }
      })
      this.setState({
        conflicts: newConflicts
      })
    }
  }

  render(){
    if (this.state.conflicts === null) {
      return (
        <div>Loading conflicts</div>
      )
    }
    if (this.state.conflicts) {
      let conflicts = this.state.conflicts.map((conflict) =>
      <EditableConflict
      conflict={conflict}
      handleDeleteClick={this.handleConflictDelete}
      handleSubmit={this.handleConflictEdit}
      key={conflict.id}
      user={this.props.user}
      />
    )
    return(
      <Col>
      <Row>
      <h2>Conflicts</h2>
      </Row>
      <Row>
      {conflicts}
      </Row>
      <Row>
        <ConflictFormToggle
          isOpen={false}
          onFormSubmit={this.handleConflictCreate}
          user={this.props.user}
        />
      </Row>
      </Col>
    )
  } else {
    return (<div></div>)
  }
  }
}

ConflictsList.propTypes = {
  user: PropTypes.object.isRequired,
}

export default ConflictsList
