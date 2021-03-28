import API from "./api";

async function buildConflictPattern(
  parentType,
  parentId,
  conflictSchedulePattern
) {
  return API.put(`${parentType}s/${parentId}/build_conflict_schedule`, {
    [parentType]: conflictSchedulePattern,
  });
}

export { buildConflictPattern };
