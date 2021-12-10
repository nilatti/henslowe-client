import axios from "axios";
export const baseUrl = "http://api.henslowescloud.com/api";
console.log(baseUrl);
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
