import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { useMeState } from "../lib/meState";
import { requestLogin } from "../api/googleAuth";

export default function LoginHooks() {
  const history = useHistory();
  const { setMe } = useMeState();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;
  const handleLogin = async (googleData) => {
    const res = await requestLogin(googleData);
    const data = res.data;
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
