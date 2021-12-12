import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { useMeState } from "../lib/meState";

export default function LoginHooks() {
  const history = useHistory();
  const { setMe } = useMeState();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
  const handleLogin = async (googleData) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_ROOT}/auth/google_oauth2/callback`,
      {
        method: "POST",
        body: JSON.stringify({
          code: googleData.code,
          grant_type: "authorization_code",
          redirect_uri: `${process.env.REACT_APP_API_ROOT}`,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await res.json();
    let tokenExpire = new Date();
    tokenExpire = tokenExpire.setDate(tokenExpire.getDate() + 250);
    localStorage.setItem("token_expire", JSON.stringify(tokenExpire));
    setMe(data);
    if (!data.program_name) {
      history.push(`/users/new`);
    } else {
      history.push("/");
    }
  };
  const handleFailure = () => {
    console.log("login failed");
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Log in or sign up with Google"
      onSuccess={handleLogin}
      onFailure={() => handleFailure}
      cookiePolicy={"single_host_origin"}
      responseType="code"
    />
  );
}
