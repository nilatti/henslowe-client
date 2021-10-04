import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { buildUserName } from "../utils/actorUtils";
const MeStateContext = createContext();
const MeStateProvider = MeStateContext.Provider;

function MeProvider({ children }) {
  const history = useHistory();
  const [me, setMe] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!me.email && localStorage.getItem("user")) {
      setMe(JSON.parse(localStorage.getItem("user")));
    } else if (new Date(localStorage.getItem("token_expire")) > new Date()) {
      setMe(null);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    if (me) {
      setMe({ ...me, name: buildUserName(me) });
      localStorage.setItem("user", JSON.stringify(me));
    }
  }, [me?.first_name, me?.preferred_name]);

  function clearMe() {
    localStorage.clear();
    setMe(null);
  }

  return (
    <MeStateProvider
      value={{
        clearMe,
        me,
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
