import axios from "axios";
export const baseUrl = `${process.env.REACT_APP_API_ROOT}/api`;
axios.defaults.withCredentials = true;
let instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
