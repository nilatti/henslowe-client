import React, { createContext, useContext, useState, useEffect } from "react";
import _ from "lodash";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function ConflictStateProvider({
  children,
  conflictReasonsArray,
  propsConflicts,
  propsConflictPatterns,
  parentId,
  parentType,
}) {
  const [conflicts, setConflicts] = useState(sortConflicts(propsConflicts));
  const [conflictPatterns, setConflictPatterns] = useState(
    propsConflictPatterns
  );

  function sortConflicts(conflicts) {
    return _.sortBy(conflicts, function (conflict) {
      return new Date(conflict.start_time);
    });
  }

  function updateConflicts(unsortedConflicts) {
    let updatedConflicts = sortConflicts(unsortedConflicts);
    setConflicts(updatedConflicts);
  }
  return (
    <LocalStateProvider
      value={{
        parentId,
        parentType,
        conflicts,
        conflictPatterns,
        conflictReasonsArray,
        setConflictPatterns,
        updateConflicts,
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
