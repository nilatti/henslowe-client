import _ from 'lodash'
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Row,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'
import uuid from 'react-uuid'
import {buildUserName} from '../../../utils/actorUtils'

class RehearsalPeopleShow extends Component {
  constructor(props, context) {
    super(props, context)
  }

  buildPeopleList(people){
    let peopleList = _.sortBy(people, ['first_name'])
    return peopleList.map((person) =>
      <li key={uuid()}>{buildUserName(person)}</li>
    )
  }

  render() {
    let people = this.buildPeopleList(this.props.users)
    return (
      <Col md={12}>
        <h2>People called:</h2>
        <ul>
          {people}
        </ul>
        <Button onClick={this.props.handleEditClick}>Edit people called</Button>
      </Col>
    )
  }
}

RehearsalPeopleShow.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default RehearsalPeopleShow
