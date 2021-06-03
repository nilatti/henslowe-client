import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "247444257677-eeu6fplpufskarhr4k7n9e1sooqe9c66.apps.googleusercontent.com"; // make this in an env or something
function onSignIn(googleUser) {
  var accessToken = googleUser.getAuthResponse().access_token;
  let email = googleUser.profileObj.email;
  let userId = "";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3001/oauth/token");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
  xhr.onload = function () {
    var data = xhr.responseText;
    var jsonResponse = JSON.parse(data);
    userId = jsonResponse["userId"];
    localStorage.setItem("userId", userId);
  };
  xhr.send(`grant_type=password&email=${email}`);
}
export default function LoginHooks() {
  const history = useHistory();
  const onSuccess = (res) => {
    onSignIn(res);
    refreshTokenSetup(res);
    console.log(localStorage.getItem("userId"));
    if (localStorage.getItem("userId") != "null") {
      //tk get user info from api, save to localStorage for use by "meProvider"
    } else {
      let email = res.profileObj.email;
      let firstName = res.profileObj.givenName;
      let lastName = res.profileObj.familyName;
      history.push({
        pathname: "/users/new",
        search: `?email=${email}&first_name=${firstName}&last_name=${lastName}&register_new=true`,
      });
      console.log("make user");
    }
    // tktktk if user exists, use id returned from API to get user info and save in localStorage
    // tktktk if user does not exist, (userid = null), redir to new user form, prefill with name & email & picture from google.
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <button onClick={signIn} className="button">
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}
