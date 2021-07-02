import { createContext, useContext, useEffect, useState } from "react";
import { buildUserName } from "../utils/actorUtils";
const MeStateContext = createContext();
const MeStateProvider = MeStateContext.Provider;

function MeProvider({ children }) {
  const [me, setMe] = useState({});
  const [meName, setMeName] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!me.name) {
      setMe(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (me) {
      console.log(me);
      setMeName(buildUserName(me));
      localStorage.setItem("userId", me.id);
    } else {
      setMeName("");
    }
  }, []);

  function clearMe() {
    localStorage.clear();
    setMe(null);
  }

  return (
    <MeStateProvider
      value={{
        clearMe,
        me,
        meName,
        signingIn,
        setMe,
        setSigningIn,
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
