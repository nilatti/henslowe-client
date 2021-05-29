import { createContext, useContext, useEffect, useState } from "react";
import { buildUserName } from "../utils/actorUtils";
const MeStateContext = createContext();
const MeStateProvider = MeStateContext.Provider;

function MeProvider({ children }) {
  const [me, setMe] = useState({});
  const [meName, setMeName] = useState("");
  useEffect(() => {
    setMe(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    if (me) {
      setMeName(buildUserName(me));
    } else {
      setMeName("");
    }
  });
  return (
    <MeStateProvider
      value={{
        me,
        meName,
      }}
    >
      {children}
    </MeStateProvider>
  );
}

function useMeState() {
  const all = useContext(MeStateContext);
  return all;
}
export { MeProvider, useMeState };
