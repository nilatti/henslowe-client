import axios from "axios";
const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  credentials: "include",
});

async function requestLogin(googleData) {
  return API.post("/auth/google_oauth2/callback", {
    code: googleData.code,
    grant_type: "authorization_code",
    redirect_uri: `${process.env.REACT_APP_API_ROOT}`,
  });
}

// await fetch(`/auth/google_oauth2/callback`, {
//     method: "POST",
//     body: JSON.stringify({
//       code: googleData.code,
//       grant_type: "authorization_code",
//       redirect_uri: `${process.env.REACT_APP_API_ROOT}`,
//     }),
//   });

export { requestLogin };
