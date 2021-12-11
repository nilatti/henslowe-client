import axios from "axios";
export const baseUrl = `https://${process.env.REACT_APP_API_ROOT}/api`;
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
});
