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
import { useConflicts } from "../../lib/conflictState";

export default function ConflictsList() {
  const {
    conflicts,
    conflictPatterns,
    parentType,
    parentId,
    setConflictPatterns,
    updateConflicts,
  } = useConflicts();

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
      updateConflicts([...conflicts, response.data]);
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
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting conflict",
      });
    } else {
      setConflictPatterns(response.data.conflict_patterns);
      // updateConflicts() theoretically should update conflicts to reflect all the patterned ones, but currently we're not showing those at all and they seem annoying to set up.
    }
  }

  async function deleteConflict(conflictId) {
    const response = await deleteItem(conflictId, "conflict");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting conflict",
      });
    } else {
      updateConflicts(
        conflicts.filter((conflict) => conflict.id !== conflictId)
      );
    }
  }

  async function deleteConflictPattern(conflictPatternId) {
    const response = await deleteItem(conflictPatternId, "conflict_pattern");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting conflict pattern",
      });
    } else {
      setConflictPatterns(
        conflictPatterns.filter(
          (conflictPattern) => conflictPattern.id !== conflictPatternId
        )
      );
      updateConflicts(
        conflicts.filter(
          (conflict) => conflict.conflict_pattern_id !== conflictPatternId
        )
      );
    }
  }

  async function updateConflict(updatedConflict) {
    const response = await updateServerItem(updatedConflict, "conflict");
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error updating conflict",
      });
    } else {
      let newConflicts = conflicts.map((conflict) => {
        if (conflict.id === updatedConflict.id) {
          return { ...conflict, ...updatedConflict };
        } else {
          return conflict;
        }
      });
      updateConflicts(newConflicts);
    }
  }

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
    createConflictSchedulePattern(
      parentId,
      parentType,
      conflictSchedulePattern
    );
  }

  function handleConflictPatternDelete(conflictPatternId) {
    deleteConflictPattern(conflictPatternId);
  }

  if (!conflicts) {
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
            onFormSubmit={handleConflictPatternCreate}
          />
        </Row>
      </Col>
    );
  } else {
    return <div></div>;
  }
}

ConflictsList.propTypes = {};
