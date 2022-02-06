import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useMeState } from "../lib/meState.js";
import { requestLogin } from "../api/googleAuth.js";
import { refreshTokenSetup } from "../utils/refreshToken.js";
import jwt_decode from "jwt-decode";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_KEY;

export default function LoginHooks() {
  const navigate = useNavigate();
  const { setMe } = useMeState();
  const onSuccess = async (googleData) => {
    const res = await requestLogin(googleData);
    const data = res.data;
    setMe(data);
    if (!data.program_name) {
      navigate(`/users/new`);
    } else {
      navigate("/");
    }
  };

  const onFailure = () => {
    console.log("login failed");
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Log in or sign up with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      responseType="code"
      isSignedIn={true}
    />
  );
}
