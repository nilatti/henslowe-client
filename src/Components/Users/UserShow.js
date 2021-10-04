import Moment from "react-moment";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { useMeState } from "../../lib/meState";
import { useUserAuthState } from "../Contexts";

import UserJobsList from "../Jobs/UserJobsList";
import ConflictsList from "../Conflicts/ConflictsList";

import { buildUserName } from "../../utils/actorUtils";
import { overlap } from "../../utils/arrayUtils";
import { ConflictStateProvider } from "../../lib/conflictState";
import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants";

export default function UserShow({ onDeleteClick, onEditClick, user }) {
  const { me } = useMeState();
  const { roles } = useUserAuthState();
  console.log(roles);

  function handleDeleteClick() {
    onDeleteClick(user.id);
  }

  return (
    <div>
      <h2>{buildUserName(user)}</h2>
      {user.email &&
        overlap(roles, [
          "current_theater_peer",
          "current_production_peer",
          "current_theater_admin",
          "current_production_admin",
          "past_theater_peer",
          "past_production_peer",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        )}
      {user.website && (
        <p>
          <a href={user.website}>{user.website}</a>
        </p>
      )}

      {user.phone_number &&
        overlap(roles, [
          "current_theater_peer",
          "current_production_peer",
          "current_theater_admin",
          "current_production_admin",
          "self",
          "superadmin",
        ]) && <div>{user.phone_number}</div>}
      {user.street_address &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && <div>{user.street_address}</div>}
      {user.city ||
        (user.state && (
          <div>
            {user.city}, {user.state} {user.zip}
          </div>
        ))}
      {user.emergency_contact_name &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>Emergency Contact:</strong> {user.emergency_contact_name},
            {user.emergency_contact_number}
          </div>
        )}
      {user.first_name &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>First name:</strong> {user.first_name}
          </div>
        )}
      {user.middle_name &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>Middle name:</strong> {user.middle_name}
          </div>
        )}
      {user.preferred_name &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>Preferred name:</strong> {user.preferred_name}
          </div>
        )}
      {user.last_name &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>Last name:</strong> {user.last_name}
          </div>
        )}
      {user.program_name && (
        <div>
          <strong>Name for programs:</strong> {user.program_name}
        </div>
      )}
      {user.birthdate &&
        overlap(roles, [
          "current_theater_admin",
          "current_production_admin",
          "past_theater_admin",
          "past_production_admin",
          "self",
          "superadmin",
        ]) && (
          <div>
            <strong>Date of Birth:</strong>{" "}
            <Moment format="MMMM Do, YYYY">{user.birthdate}</Moment>
          </div>
        )}
      {user.gender && (
        <div>
          <strong>Gender:</strong> {user.gender}
        </div>
      )}
      {user.description && (
        <div>
          <strong>Description:</strong> {user.description}
        </div>
      )}
      {user.bio && (
        <div>
          <strong>Bio:</strong> {user.bio}
        </div>
      )}
      {user.timezone && (
        <div>
          <strong>Timezone:</strong> {user.timezone}
        </div>
      )}
      {roles.includes("self") && (
        <div>
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span className="right floated trash icon" onClick={onDeleteClick}>
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      )}
      {overlap(roles, [
        "current_theater_peer",
        "current_production_peer",
        "current_theater_admin",
        "current_production_admin",
        "self",
        "superadmin",
      ]) && (
        <ConflictStateProvider
          conflictReasonsArray={USER_CONFLICT_REASONS}
          parentId={user.id}
          parentType="user"
          propsConflicts={user.conflicts}
          propsConflictPatterns={user.conflict_patterns}
          roles={roles}
        >
          <h3>Conflicts</h3>
          <ConflictsList />
        </ConflictStateProvider>
      )}
      <h3>Jobs</h3>
      <UserJobsList user={user} roles={roles} />
    </div>
  );
}

UserShow.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
