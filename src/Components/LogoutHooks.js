import React from "react";
import { GoogleLogout } from "react-google-login";
import { useMeState } from "../lib/meState";
import { useMountedState } from "../lib/mountedState";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

function LogoutHooks() {
  const isMounted = useMountedState();
  const { clearMe } = useMeState();
  const onLogoutSuccess = () => {
    clearMe();
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  // function signOut() {
  //   if (isMounted()) {
  //     useGoogleLogout({
  //       clientId,
  //       onLogoutSuccess,
  //       onFailure,
  //     });
  //   }
  // }

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
