import Moment from "react-moment";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import React, { createContext, useContext, useState } from "react";

import UserJobsList from "../Jobs/UserJobsList";
import ConflictsList from "../Conflicts/ConflictsList";

import { UserAuthContext } from "../Contexts";

import { buildUserName } from "../../utils/actorUtils";
import { ConflictStateProvider } from "../../lib/conflictState";
import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants";

export default function UserShow({ onDeleteClick, onEditClick, user }) {
  function handleDeleteClick() {
    onDeleteClick(user.id);
  }

  function handleSelect(key) {
    this.setState({
      key,
    });
  }

  return (
    <Col md={12}>
      <Row>
        <Col md={12} className="user-profile">
          <h2>{buildUserName(user)}</h2>
          <p>
            <UserAuthContext.Consumer>
              {(value) => {
                if (
                  value === "theater_admin" ||
                  value === "theater_peer" ||
                  value === "superadmin" ||
                  value === "self"
                ) {
                  return <a href={`mailto:${user.email}`}>{user.email}</a>;
                }
              }}
            </UserAuthContext.Consumer>
            <br />
            <a href={user.website}>{user.website}</a>
          </p>
          <UserAuthContext.Consumer>
            {(value) => {
              if (
                value === "theater_admin" ||
                value === "theater_peer" ||
                value === "superadmin" ||
                value === "self"
              ) {
                return (
                  <p>
                    {user.phone_number}
                    <br />
                    {user.street_address}
                    <br />
                    {user.city}, {user.state} {user.zip}
                    <br />
                    <strong>Emergency Contact:</strong>{" "}
                    {user.emergency_contact_name},{" "}
                    {user.emergency_contact_number}
                  </p>
                );
              }
            }}
          </UserAuthContext.Consumer>
          <UserAuthContext.Consumer>
            {(value) => {
              if (
                value === "theater_admin" ||
                value === "superadmin" ||
                value === "self"
              ) {
                return (
                  <div>
                    <p>
                      <strong>First name:</strong> {user.first_name}
                      <br />
                      <strong>Middle name:</strong> {user.middle_name}
                      <br />
                      <strong>Preferred name:</strong> {user.preferred_name}
                      <br />
                      <strong>Last name:</strong> {user.last_name}
                      <br />
                      <strong>Name for programs:</strong> {user.program_name}
                      <br />
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      <Moment format="MMMM Do, YYYY">{user.birthdate}</Moment>
                      <br />
                      <strong>Gender:</strong> {user.gender}
                      <br />
                      <strong>Description:</strong> {user.description}
                      <br />
                      <strong>Bio:</strong> {user.bio}
                      <br />
                    </p>
                    <p>
                      <strong>Timezone:</strong> {user.timezone}
                    </p>

                    <span
                      className="right floated edit icon"
                      onClick={onEditClick}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                    <span
                      className="right floated trash icon"
                      onClick={onDeleteClick}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>
                );
              } else if (value === "theater_peer") {
                return (
                  <div>
                    <p>
                      <strong>Preferred name:</strong>{" "}
                      {user.preferred_name || user.first_name}
                      <br />
                      <strong>Last name:</strong> {user.last_name}
                      <br />
                      <strong>Name for programs:</strong> {user.program_name}
                      <br />
                    </p>
                    <p>
                      <strong>Gender:</strong> {user.gender}
                      <br />
                      <strong>Bio:</strong> {user.bio}
                      <br />
                    </p>
                    <p>
                      <strong>Emergency Contact:</strong>{" "}
                      {user.emergency_contact_name},{" "}
                      {user.emergency_contact_number}
                    </p>
                  </div>
                );
              } else {
                return (
                  <p>
                    <strong>Name for programs:</strong> {user.program_name}
                    <br />
                    <strong>Gender:</strong> {user.gender}
                    <br />
                    <strong>Bio:</strong> {user.bio}
                    <br />
                  </p>
                );
              }
            }}
          </UserAuthContext.Consumer>
        </Col>
      </Row>
      <hr />
      <UserAuthContext.Consumer>
        {(value) => {
          if (
            value === "theater_admin" ||
            value === "superadmin" ||
            value === "self"
          ) {
            return (
              <Row>
                <ConflictStateProvider
                  parentId={user.id}
                  parentType="user"
                  propsConflicts={user.conflicts}
                  propsConflictPatterns={user.conflict_patterns}
                  conflictReasonsArray={USER_CONFLICT_REASONS}
                >
                  <ConflictsList />
                </ConflictStateProvider>
                <hr />
              </Row>
            );
          }
        }}
      </UserAuthContext.Consumer>
      <Row>
        <UserJobsList user={user} />
      </Row>
    </Col>
  );
}

UserShow.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
