import { useUserAuthState } from "../Contexts.js";

import UserJobsList from "../Jobs/UserJobsList.js";
import ConflictsList from "../Conflicts/ConflictsList.js";

import { buildUserName } from "../../utils/actorUtils.js";
import { overlap } from "../../utils/arrayUtils.js";
import { ConflictStateProvider } from "../../lib/conflictState.js";
import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants.js";
import { DisplayDate } from "../../utils/dateTimeUtils.js";

export default function UserShow({ onDeleteClick, onEditClick, user }) {
  const { roles } = useUserAuthState();

  function handleDeleteClick() {
    onDeleteClick(user.id);
  }

  return (
    <div>
      <h2>{buildUserName(user)}</h2>
      {overlap(roles, ["self", "superadmin"]) && (
        <div>
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
        </div>
      )}
      {overlap(roles, ["superadmin"]) && (
        <div>
          <span
            className="right floated trash icon"
            onClick={handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      )}
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
      {user.preferred_name && (
        <div>
          <strong>Preferred name:</strong> {user.preferred_name}
        </div>
      )}
      {user.last_name && (
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
            <DisplayDate date={user.birthdate} timezone={me.timezone} />
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
