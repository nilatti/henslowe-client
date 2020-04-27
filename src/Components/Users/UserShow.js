import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-bootstrap'
import React, {
  Component
} from 'react'

import UserJobsList from '../Jobs/UserJobsList'
import ConflictsList from './Conflicts/ConflictsList'

import {UserAuthContext} from '../Contexts'

import {buildUserName} from '../../utils/actorUtils'
class UserShow extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: ''
    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.user.id)
  }

  handleSelect(key) {
    this.setState({
      key
    });
  }

  render() {

    return (
      <Col md={12}>
      <Row>
        <Col md={12} className="user-profile">
          <h2>{buildUserName(this.props.user)}</h2>
          <p>
            <UserAuthContext.Consumer>
              {value => {
                if (value === 'theater_admin' || value === 'theater_peer' || value === 'superadmin' || value === 'self') {
                  return (
                    <a href={`mailto:${this.props.user.email}`}>{this.props.user.email}</a>
                  )
                }
              }}
            </UserAuthContext.Consumer>
            <br />
            <a href={this.props.user.website}>{this.props.user.website}</a>
          </p>
          <UserAuthContext.Consumer>
            {value => {
              if (value === 'theater_admin' || value === 'theater_peer' || value === 'superadmin' || value === 'self') {
                return (
                  <p>
                    {this.props.user.phone_number}<br />
                    {this.props.user.street_address}<br />
                    {this.props.user.city}, {this.props.user.state}  {this.props.user.zip}<br />
                    <strong>Emergency Contact:</strong> {this.props.user.emergency_contact_name}, {this.props.user.emergency_contact_number}
                  </p>
                )
              }
            }}
          </UserAuthContext.Consumer>
          <UserAuthContext.Consumer>
            {value => {
              if (value === 'theater_admin' || value === 'superadmin' || value === 'self') {
                return (
                  <div>
                  <p>
                    <strong>First name:</strong> {this.props.user.first_name}<br />
                    <strong>Middle name:</strong> {this.props.user.middle_name}<br />
                    <strong>Preferred name:</strong> {this.props.user.preferred_name}<br />
                    <strong>Last name:</strong> {this.props.user.last_name}<br />
                    <strong>Name for programs:</strong> {this.props.user.program_name}<br />
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> <Moment format="MMMM Do, YYYY">{this.props.user.birthdate}</Moment><br />
                      <strong>Gender:</strong> {this.props.user.gender}<br />
                      <strong>Description:</strong> {this.props.user.description}<br />
                      <strong>Bio:</strong> {this.props.user.bio}<br />
                    </p>
                    <p>
                      <strong>Timezone:</strong> {this.props.user.timezone}
                    </p>

                    <span
                      className='right floated edit icon'
                      onClick={this.props.onEditClick}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                    <span
                      className='right floated trash icon'
                      onClick={this.handleDeleteClick}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    </div>
                )
              } else if (value === 'theater_peer') {
                return (
                <div>
                <p>
                  <strong>Preferred name:</strong> {this.props.user.preferred_name || this.props.user.first_name}<br />
                  <strong>Last name:</strong> {this.props.user.last_name}<br />
                  <strong>Name for programs:</strong> {this.props.user.program_name}<br />
                  </p>
                  <p>
                    <strong>Gender:</strong> {this.props.user.gender}<br />
                    <strong>Bio:</strong> {this.props.user.bio}<br />
                  </p>
                  <p>
                    <strong>Emergency Contact:</strong> {this.props.user.emergency_contact_name}, {this.props.user.emergency_contact_number}
                  </p>
                  </div>
                )
              } else {
                return (
                  <p>
                    <strong>Name for programs:</strong> {this.props.user.program_name}<br />
                    <strong>Gender:</strong> {this.props.user.gender}<br />
                    <strong>Bio:</strong> {this.props.user.bio}<br />
                  </p>
                )
              }
            }}
          </UserAuthContext.Consumer>
        </Col>
      </Row>
      <hr />
      <UserAuthContext.Consumer>
        {value => {
          if (value === 'theater_admin' || value === 'superadmin' || value === 'self') {
            return (
            <Row>
              <ConflictsList user={this.props.user} />
              <hr />
            </Row>
          )
          }
        }}
      </UserAuthContext.Consumer>
      <Row>
        <UserJobsList user={this.props.user} />
      </Row>
      </Col>
    )
  }
}

UserShow.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserShow
