import _ from 'lodash'
import PropTypes from 'prop-types';
import React, {
  Component
} from 'react'
import {
  Button,
  Col,
  Row,
} from 'react-bootstrap'

import {buildUserName} from '../../../utils/actorUtils'
import {unavailableUsers} from '../../../utils/rehearsalUtils'
import DraggableLists from '../../../utils/DraggableLists'

class RehearsalPeopleForm extends Component {
  constructor(props) {
    super(props)
    this.state={
      calledUsers: this.props.rehearsal.users,
      hiredUsers: this.props.hiredUsers,
    }
  }

  componentDidMount() {
    this.processCalledUsers(this.state.calledUsers)
    this.processHiredUsers(this.state.hiredUsers)
  }

  availableUsers(users, rehearsal) {
    let availableUsers = users.map((user) => {
      if (user.conflicts.length === 0) {
        return user
      } else {
        let conflicts_with_this_rehearsal = 0
        user.conflicts.map((conflict) => {
          if (conflict.start_time <= rehearsal.end_time && rehearsal.start_time <= conflict.end_time) {
            conflicts_with_this_rehearsal += 1
          }
        })
        if (conflicts_with_this_rehearsal <= 0) {
          return user
        }
      }
    })
    return availableUsers.filter(Boolean)
  }

  buildHeadersForDraggable(users) {
    let newUsers = users.map((user) => {
      let newHeading = buildUserName(user)
      return {...user, heading: newHeading}
    })
    return newUsers
  }

  filterUsersAlreadyCalled(allUsers, calledUsers) {
    let calledUsersIds = calledUsers.map((user) => user.id)
    let filtered = allUsers.map((user) => {
      if (_.includes(calledUsersIds, user.id)) {
        return
      } else {
        return user
      }
    })
    return _.compact(filtered)
  }

  getUserObjectFromJobs(calledUsers, hiredUsers) { //the hired users info includes conflicts but the on-stage users info does not
    return calledUsers.map((user) => _.find(hiredUsers, {'id': user.id}))
  }

  handleListChange = (listName, listContent) => {
    this.setState({
      [listName]: listContent
    })
  }

  markUsersAvailable(users) {
    return users.map((user) => {
      if (user.hasOwnProperty('isRecommended')) {
        return user
      } else {
        return {...user, isRecommended: true}
      }
    })
  }

  markUsersUnavailable(users, rehearsal) {
    let newUnavailableUsers = unavailableUsers(users, rehearsal)
    return users.map((user) => {
      if (newUnavailableUsers.includes(user)) {
        return {...user, isRecommended: false}
      } else {
        return {...user, isRecommended: true}
      }
    })
  }

  processCalledUsers = (users) => {
    let sortedUsers = this.sortUsers(users)
    let usersWithConflicts = this.getUserObjectFromJobs(sortedUsers, this.state.hiredUsers)
    let unavailableMarked = this.markUsersUnavailable(usersWithConflicts, this.props.rehearsal)
    let availableMarked = this.markUsersAvailable(unavailableMarked)
    let withHeaders = this.buildHeadersForDraggable(availableMarked)
    this.setState({
      calledUsers: withHeaders
    })
  }

  processHiredUsers = (users) => {
    let sortedUsers = this.sortUsers(users)
    let usersWithConflicts = this.getUserObjectFromJobs(sortedUsers, this.state.hiredUsers)
    let unavailableMarked = this.markUsersUnavailable(usersWithConflicts, this.props.rehearsal)
    let availableMarked = this.markUsersAvailable(unavailableMarked)
    let withHeaders = this.buildHeadersForDraggable(availableMarked)
    let filtered = this.filterUsersAlreadyCalled(withHeaders, this.state.calledUsers)
    this.setState({
      hiredUsers: filtered
    }, function() {
      this.setUsersLists()
    })
  }

  setUsers = (e) => {
    let newRehearsal = {
      id: this.props.rehearsal.id,
      user_ids: this.state.calledUsers.map((user) => user.id),
    }
    this.props.onFormSubmit(newRehearsal, "rehearsal")
    this.props.onFormClose()
  }

  setUsersLists = () => {
    //this is a hack
    let newListContents = [
      {
        header: 'Not Called',
        listContent: this.state.hiredUsers,
        listId: 'hiredUsers'
      },
      {
        header: 'Called',
        listContent: this.state.calledUsers,
        listId: 'calledUsers'
      },
    ]
    this.setState({
      listContents: newListContents
    })
  }

  sortUsers(users) {
    return _.sortBy(users,['first_name'])
  }

  render() {
    const {
      validated
    } = this.state
    if (this.state.listContents && this.state.listContents.length > 1) {
      return(
        <Col>
          <Row>
            <DraggableLists
              listContents={this.state.listContents}
              handleListChange={this.handleListChange}
            />
          </Row>
          <Row>
            <Button onClick={this.setUsers}>Schedule these people</Button>
          </Row>
          <Button type="button" onClick={this.props.onFormClose} block>Cancel</Button>
        </Col>

      )
    } else {
      return (<div>Loading!</div>)
    }

    }
  }

RehearsalPeopleForm.propTypes = {
  hiredUsers: PropTypes.array.isRequired,
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  rehearsal: PropTypes.object.isRequired,
}

export default RehearsalPeopleForm
