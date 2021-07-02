import PropTypes from "prop-types";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

import SpaceAgreementFormForSpacesToggle from "../SpaceAgreements/SpaceAgreementFormForSpacesToggle";
import TheaterInfoTab from "../Theaters/TheaterInfoTab";
import { SPACE_CONFLICT_REASONS } from "../../utils/hardcodedConstants";

import { Button } from "../Button";
import { useSpaceAuthState } from "../Contexts";
import { ConflictStateProvider } from "../../lib/conflictState";
import ConflictsList from "../Conflicts/ConflictsList";

export default function SpaceShow({
  space,
  onDeleteClick,
  onEditClick,
  onFormSubmit,
}) {
  const { roles } = useSpaceAuthState();
  const [key, setKey] = useState();

  function handleDeleteClick() {
    onDeleteClick(space.id);
  }

  function handleSelect(key) {
    setKey(key);
  }

  let theaterTabs;
  if (space && space.theaters && space.theaters.length > 0) {
    theaterTabs = space.theaters.map((theater) => (
      <Tab
        eventKey={`theater-${theater.id}`}
        title={theater.name}
        key={`theater-${theater.id}`}
      >
        <TheaterInfoTab theater={theater} />
      </Tab>
    ));
  } else {
    theaterTabs = <div>No theaters found</div>;
  }

  return (
    <div className="space-profile">
      <h2>{space.name}</h2>
      {space.mission_statement && (
        <p>
          <em>{space.mission_statement}</em>
        </p>
      )}
      {space.street_address && <p>{space.street_address}</p>}
      {space.city && (
        <p>
          {space.city}, {space.state} {space.zip}
        </p>
      )}
      {space.phone_number && <p>{space.phone_number}</p>}
      {space.website && (
        <a href={"http://" + space.website} target="_blank">
          {space.website}
        </a>
      )}
      {roles.includes("theater_admin") && (
        <>
          <span className="right floated edit icon" onClick={onEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className="right floated trash icon"
            onClick={handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </>
      )}

      <hr />

      <h2>Theaters</h2>
      {roles.includes("theater_admin") && (
        <SpaceAgreementFormForSpacesToggle
          space={space}
          isOpen={false}
          onFormSubmit={onFormSubmit}
        />
      )}

      <Tabs activeKey={key} onSelect={handleSelect} id="theater-info-tabs">
        {theaterTabs}
      </Tabs>

      <h2>Scheduling</h2>

      <ConflictStateProvider
        parentId={space.id}
        parentType="space"
        propsConflicts={space.conflicts}
        propsConflictPatterns={space.conflict_patterns}
        conflictReasonsArray={SPACE_CONFLICT_REASONS}
        roles={roles}
      >
        <ConflictsList />
      </ConflictStateProvider>
      <hr />
    </div>
  );
}

SpaceShow.propTypes = {
  space: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
