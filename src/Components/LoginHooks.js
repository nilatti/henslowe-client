import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../utils/refreshToken";
import { getItem } from "../api/crud";
import { useMeState } from "../lib/meState";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

/* note to future self:
  1. User hits "login with google" button
  2. Google sends a request that is wrapped in a pretty way by react-google-login. func signIn
  3. onFailure signIn, it console logs a problem (tktktk make this into an error message)
  3. onSuccess ful signin, it runs onSuccess.
  4. in onSuccess, it calls onSignIn, passing the response of the google sign in (googleUser).
  5. onSignIn passes the google user including (crucial) accessToken to API
  6. Doorkeeper gem verifys google access token.
  7. Doorkeeper gem checks if there is a user with the email address associated with the Google Account.
  8. If there is a user with that email, Doorkeeper returns the user id
  9. If not, Doorkeeper returns ID = null
  10. In callback onSuccess > call, we set the localStorage "userId"
  11. If "userId" is null, direct user to registration page.
  12. If "userId" is a number, send an API request to get the rest of that user's information.
  13. Save this information in the me provider
*/

async function onSignIn(googleUser, callback) {
  var accessToken = googleUser.getAuthResponse().access_token;
  let email = googleUser.profileObj.email;
  var xhr = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 300) {
          reject("Error, status code = " + xhr.status);
        } else {
          var response = xhr.responseText;
          var regexUserId = /\"userId\":(\d+)/;
          var regexAccessToken = /\"access_token\":\"([^,]+)\"/;
          var userId = response.match(regexUserId); //extract the user id from the response, once the response loads
          var accessToken = response.match(regexAccessToken);
          if (callback && userId) {
            callback(userId[1], accessToken[1]);
          } else if (callback && accessToken) {
            callback(null, accessToken[1]);
          }
          resolve(xhr.responseText);
        }
      }
    };
    xhr.open("POST", "http://localhost:3001/oauth/token"), true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    xhr.send(`grant_type=password&email=${email}`);
  });
}

export default function LoginHooks() {
  const { setMe } = useMeState();
  const history = useHistory();

  const onSuccess = async (res) => {
    function call(userId, accessToken) {
      //callback for the xhr request, should run after the xhr request gets a response
      localStorage.setItem("userId", userId);
      localStorage.setItem("authToken", accessToken);
    }
    async function storeUser(userId) {
      let user = await loadUser(userId); //if we have a user id, load the user
      setMe(user);
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/dashboard");
    }
    try {
      let user = await onSignIn(res, call);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
    refreshTokenSetup(res);
    if (
      localStorage.getItem("userId") &&
      localStorage.getItem("userId") != "null"
    ) {
      //let's double check about that user question

      storeUser(parseInt(localStorage.getItem("userId")));
    } else {
      //if we don't have a user id, which means the API did not recognize the user, go to the create user form to register user
      let email = res.profileObj.email;
      let firstName = res.profileObj.givenName;
      let lastName = res.profileObj.familyName;
      setMe({ email: email, first_name: firstName, last_name: lastName });
      history.push({
        pathname: "/users/new",
        search: `?email=${email}&first_name=${firstName}&last_name=${lastName}&register_new=true`,
      });
    }
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

  async function loadUser(userId) {
    let response = await getItem(userId, "user");
    if (response.status >= 400) {
      console.log("error loading user");
    } else {
      return response.data;
    }
  }

  return (
    <button onClick={signIn} className="button">
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}
