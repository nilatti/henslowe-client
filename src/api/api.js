import axios from "axios";
export const baseUrl = `http://localhost:3001/api`;
// export const baseUrl = `${process.env.REACT_APP_API_ROOT}/api`;
axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": false,
    "Content-Type": "application/json",
  },
});
