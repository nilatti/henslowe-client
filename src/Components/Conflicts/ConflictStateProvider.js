import React, { createContext, useContext } from "react";
import _ from "lodash";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function ConflictStateProvider({
  children,
  unsortedConflicts,
  conflictPatterns,
  parentId,
  parentType,
}) {
  let conflicts = _.sortBy(unsortedConflicts, function (conflict) {
    return new Date(conflict.start_time);
  });
  return (
    <LocalStateProvider
      value={{
        parentId,
        parentType,
        conflicts,
        conflictPatterns,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useConflicts() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}
export { ConflictStateProvider, useConflicts };
