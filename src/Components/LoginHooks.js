import React from "react";
import { useGoogleLogin } from "react-google-login";
import AuthService from "../services/auth.service";
// refresh token
import axios from "axios";
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "247444257677-eeu6fplpufskarhr4k7n9e1sooqe9c66.apps.googleusercontent.com";
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3001/api/auth/google_oauth2/callback");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    console.log("Signed in as: " + xhr.responseText);
  };
  xhr.send("idtoken=" + id_token);
}
function LoginHooks() {
  const onSuccess = (res) => {
    onSignIn(res);
    console.log("Login Success: currentUser:", res.profileObj);
    // let user = {
    //   email: res.profileObj.email,
    // };
    let api = axios.create({
      baseURL: "http://localhost:3001/api",
      headers: {
        // Authorization: `${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(res.token);
    api
      .post("/auth/google_oauth2/callback", { res })
      .then((response) => console.log(response));
    // jQuery.ajax({
    //   type: "POST",
    //   url: "/auth/google_oauth2/callback",
    //   data: response,
    //   success: function (data) {
    //     console.log(data);
    //   },
    // });
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;
