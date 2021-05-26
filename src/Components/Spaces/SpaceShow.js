import PropTypes from "prop-types";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";

import SpaceAgreementFormForSpacesToggle from "../SpaceAgreements/SpaceAgreementFormForSpacesToggle";
import TheaterInfoTab from "../Theaters/TheaterInfoTab";
import { SPACE_CONFLICT_REASONS } from "../../utils/hardcodedConstants";

import { SpaceAuthContext } from "../Contexts";
import { ConflictStateProvider } from "../../lib/conflictState";
import ConflictsList from "../Conflicts/ConflictsList";

export default function SpaceShow({
  space,
  onDeleteClick,
  onEditClick,
  onFormSubmit,
}) {
  const [key, setKey] = useState("");

  function handleDeleteClick(id) {
    onDeleteClick(id);
  }

  function handleSelect(key) {
    setKey(key);
  }
  console.log(space);

  let theaterTabs;
  if (space.theaters[0]) {
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
    <Col md={12}>
      <Row>
        <Col md={12} className="space-profile">
          <h2>{space.name}</h2>
          <p>
            <em>{space.mission_statement}</em>
          </p>
          <p>
            {space.street_address}
            <br />
            {space.city}, {space.state} {space.zip}
            <br />
            {space.phone_number}
            <br />
            <a href={"http://" + space.website} target="_blank">
              {space.website}
            </a>
          </p>
          <SpaceAuthContext.Consumer>
            {(value) => {
              if (value === "theater_admin") {
                return (
                  <>
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
                  </>
                );
              }
            }}
          </SpaceAuthContext.Consumer>
        </Col>
      </Row>
      <hr />
      <Row>
        <h2>Theaters</h2>
      </Row>
      <SpaceAuthContext.Consumer>
        {(value) => {
          if (value === "admin") {
            return (
              <Row>
                <SpaceAgreementFormForSpacesToggle
                  space={space}
                  isOpen={false}
                  onFormSubmit={onFormSubmit}
                />
              </Row>
            );
          }
        }}
      </SpaceAuthContext.Consumer>

      <Tabs activeKey={key} onSelect={handleSelect} id="theater-info-tabs">
        {theaterTabs}
      </Tabs>
      <SpaceAuthContext.Consumer>
        {(value) => {
          console.log("auth value", value);
          if (value === "theater_admin" || value === "superadmin") {
            return (
              <>
                <Row>
                  <h2>Scheduling</h2>
                </Row>
                <Row>
                  <ConflictStateProvider
                    parentId={space.id}
                    parentType="space"
                    propsConflicts={space.conflicts}
                    propsConflictPatterns={space.conflict_patterns}
                    conflictReasonsArray={SPACE_CONFLICT_REASONS}
                  >
                    <ConflictsList />
                  </ConflictStateProvider>
                  <hr />
                </Row>
              </>
            );
          }
        }}
      </SpaceAuthContext.Consumer>
    </Col>
  );
}

SpaceShow.propTypes = {
  space: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
