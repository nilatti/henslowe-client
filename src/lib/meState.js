import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { buildUserName } from "../utils/actorUtils.js";
import { updateServerItem } from "../api/crud.js";
const MeStateContext = createContext();
const MeStateProvider = MeStateContext.Provider;

function MeProvider({ children }) {
  const navigate = useNavigate();
  const [me, setMe] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (me.subscription_end_date < Date.now()) {
      setMe({ ...me, subscription_status: "expired" });
    }
    if (!me.email && localStorage.getItem("user")) {
      setMe(JSON.parse(localStorage.getItem("user")));
    } else if (new Date(localStorage.getItem("token_expire")) > new Date()) {
      setMe(null);
      localStorage.clear();
    } else {
      localStorage.setItem("user", JSON.stringify(me));
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
    // navigate(`/?error=${error}`);
  }

  async function updateMe(newMe) {
    let res = await updateServerItem(newMe, "user");
    if (res.status >= 400) {
      console.log("error updating user");
    } else {
      setMe(res.data);
    }
  }

  return (
    <MeStateProvider
      value={{
        clearMe,
        me,
        signingIn,
        setMe,
        setSigningIn,
        updateMe,
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
