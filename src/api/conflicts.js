import API from "./api.js";

async function buildConflictPattern(
  parentId,
  parentType,
  conflictSchedulePattern
) {
  return API.put(`${parentType}s/${parentId}/build_conflict_schedule`, {
    conflict_schedule_pattern: conflictSchedulePattern,
  });
}

export { buildConflictPattern };
