import _ from "lodash";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { buildConflictPattern } from "../../api/conflicts.js";

import {
  createItemWithParent,
  deleteItem,
  updateServerItem,
} from "../../api/crud";

import ConflictFormToggle from "./ConflictFormToggle";
import ConflictPatternCreatorToggle from "./ConflictPatternCreatorToggle";
import EditableConflict from "./EditableConflict";
import ConflictPatternShow from "./ConflictPatternShow";
import { useConflicts } from "../Conflicts/ConflictStateProvider";

async function createConflict(parentId, parentType, conflict) {
  const response = await createItemWithParent(
    parentType,
    parentId,
    "conflict",
    conflict
  );
  if (response.status >= 400) {
    this.setState({
      errorStatus: "Error creating conflict",
    });
  } else {
    let newConflicts = _.sortBy(
      [...this.state.conflicts, response.data],
      function (conflict) {
        return new Date(conflict.start_time);
      }
    );
    this.setState({
      conflicts: newConflicts,
    });
  }
}

async function deleteConflict(conflictId) {
  const response = await deleteItem(conflictId, "conflict");
  if (response.status >= 400) {
    this.setState({
      errorStatus: "Error deleting conflict",
    });
  } else {
    this.setState({
      conflicts: this.state.conflicts.filter(
        (conflict) => conflict.id !== conflictId
      ),
    });
  }
}

async function deleteConflictPattern(conflictPatternId) {
  const response = await deleteItem(conflictPatternId, "conflict_pattern");
  if (response.status >= 400) {
    this.setState({
      errorStatus: "Error deleting conflict pattern",
    });
  } else {
    this.setState({
      conflictPatterns: this.state.conflictPatterns.filter(
        (conflictPattern) => conflictPattern.id !== conflictPatternId
      ),
      conflicts: this.state.conflicts.filter(
        (conflict) => conflict.conflict_pattern_id !== conflictPatternId
      ),
    });
  }
}

async function updateConflict(updatedConflict) {
  const response = await updateServerItem(updatedConflict, "conflict");
  if (response.status >= 400) {
    this.setState({
      errorStatus: "Error updating conflict",
    });
  } else {
    let newConflicts = this.state.conflicts.map((conflict) => {
      if (conflict.id === updatedConflict.id) {
        return { ...conflict, ...updatedConflict };
      } else {
        return conflict;
      }
    });
    this.setState({
      conflicts: newConflicts,
    });
  }
}

async function createConflictSchedulePattern(
  parentId,
  parentType,
  conflictSchedulePattern
) {
  let response = await buildConflictPattern(
    parentId,
    parentType,
    conflictSchedulePattern
  );
  this.setState({
    conflictPatterns: response.data.conflict_patterns,
  });
}

export default function ConflictsList() {
  const { conflicts, conflictPatterns, parentType, parentId } = useConflicts();

  function handleConflictCreate(conflict) {
    createConflict(parentId, parentType, conflict);
  }

  function handleConflictDelete(conflictId) {
    deleteConflict(conflictId);
  }

  function handleConflictEdit(conflict) {
    updateConflict(conflict);
  }

  function handleConflictPatternCreate(conflictSchedulePattern) {
    console.log(127);
    console.log(parentId);
    createConflictSchedulePattern(
      parentId,
      parentType,
      conflictSchedulePattern
    );
  }
  function handleConflictPatternDelete(conflictPatternId) {
    deleteConflictPattern(conflictPatternId);
  }

  if (conflicts === null || conflictPatterns === null) {
    return <div>Loading conflicts</div>;
  }
  if (conflicts) {
    let showConflicts = conflicts
      .filter((conflict) => !conflict.regular)
      .map((conflict) => (
        <EditableConflict
          conflict={conflict}
          handleDeleteClick={handleConflictDelete}
          handleSubmit={handleConflictEdit}
          key={conflict.id}
          parentId={parentId}
        />
      ));
    let showConflictPatterns = conflictPatterns.map((conflictPattern) => (
      <ConflictPatternShow
        conflictPattern={conflictPattern}
        handleDeleteClick={handleConflictPatternDelete}
        key={conflictPattern.id}
      />
    ));
    return (
      <Col>
        <Row>
          <h2>One-Off Conflicts</h2>
        </Row>
        <Row>{showConflicts}</Row>
        <ConflictFormToggle
          isOpen={false}
          onFormSubmit={handleConflictCreate}
        />
        <Row>
          <h2>Regular Conflicts</h2>
        </Row>
        <Row>{showConflictPatterns}</Row>
        <Row>
          <ConflictPatternCreatorToggle
            open={false}
            submitHandler={handleConflictPatternCreate}
          />
        </Row>
      </Col>
    );
  } else {
    return <div></div>;
  }
}
