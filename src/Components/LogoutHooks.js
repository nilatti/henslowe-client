import React from "react";
import { useGoogleLogout } from "react-google-login";

const clientId =
  "247444257677-eeu6fplpufskarhr4k7n9e1sooqe9c66.apps.googleusercontent.com";

function LogoutHooks() {
  const onLogoutSuccess = (res) => {
    console.log(res);
    console.log("Logged out Success");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHooks;
