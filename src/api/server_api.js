import axios from "axios";
export const baseUrl = process.env.REACT_APP_API_ROOT;
console.log(baseUrl);
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
