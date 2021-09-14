import _ from "lodash";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
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
import { overlap } from "../../utils/arrayUtils";
import { useConflicts } from "../../lib/conflictState";

export default function ConflictsList({ current = false }) {
  const {
    conflicts,
    conflictPatterns,
    parentType,
    parentId,
    roles,
    setConflictPatterns,
    updateConflicts,
  } = useConflicts();

  let localRole = "";
  // spaces are administered by theater admins and space admins
  if (
    parentType === "space" &&
    overlap(roles, ["theater_admin", "space_admin"])
  ) {
    localRole = "admin";
  } else if (
    //for users, CURRENT production and theater admins can see and modify conflict details. User can modify own details.
    parentType === "user" &&
    overlap(roles, ["current_theater_admin", "current_production_admin"])
  ) {
    localRole = "admin";
  } else if (
    //current theater peers can see some details but not all details.
    parentType === "user" &&
    overlap(roles, ["current_theater_peer", "current_production_peer"])
  ) {
    localRole = "peer";
  } else if (parentType === "user" && roles && roles.includes("self")) {
    localRole = "self";
  } else if (roles && roles.includes("superadmin")) {
    localRole = "admin";
  }
  const history = useHistory();

  async function createConflict(conflict, parentId, parentType) {
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
    createConflict(conflict, parentId, parentType);
    // history.push(`/${parentType}s/${parentId}`);
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
      .filter((conflict) => {
        if (current) {
          return (
            (!conflict.regular &&
              new Date(conflict.start_time) <= Date.now()) ||
            new Date(conflict.end_time) >= Date.now()
          );
        } else {
          return !conflict.regular;
        }
      })
      .map((conflict) => (
        <EditableConflict
          conflict={conflict}
          handleDeleteClick={handleConflictDelete}
          handleSubmit={handleConflictEdit}
          key={conflict.id}
          parentId={parentId}
          role={localRole}
        />
      ));
    let showConflictPatterns = conflictPatterns
      ?.filter((conflictPattern) => {
        if (current) {
          return (
            new Date(conflictPattern.start_time) <= Date.now() ||
            new Date(conflictPattern.end_time) >= Date.now()
          );
        } else {
          return true;
        }
      })
      .map((conflictPattern) => (
        <ConflictPatternShow
          conflictPattern={conflictPattern}
          handleDeleteClick={handleConflictPatternDelete}
          key={conflictPattern.id}
          role={localRole}
        />
      ));
    return (
      <>
        <h4>One-Off Conflicts</h4>
        <ul>{showConflicts}</ul>
        {localRole && (localRole === "admin" || localRole === "self") && (
          <div>
            <ConflictFormToggle
              isOpen={false}
              onFormSubmit={handleConflictCreate}
            />
          </div>
        )}
        <h4>Regular Conflicts</h4>
        <ul>{showConflictPatterns}</ul>
        {localRole && (localRole === "admin" || localRole === "self") && (
          <ConflictPatternCreatorToggle
            open={false}
            onFormSubmit={handleConflictPatternCreate}
          />
        )}
      </>
    );
  } else {
    return <div></div>;
  }
}

ConflictsList.propTypes = {};
