import React from "react";
import { GoogleLogout, useGoogleLogout } from "react-google-login";
import { useMeState } from "../lib/meState.js";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

function LogoutHooks() {
  const { clearMe } = useMeState();
  const onLogoutSuccess = () => {
    clearMe();
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };
  const signOut = () =>
    useGoogleLogout({
      clientId,
      onLogoutSuccess,
      onFailure,
    });
  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
    ></GoogleLogout>
  );
}

export default LogoutHooks;
