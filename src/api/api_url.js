import axios from "axios";
export const baseUrl = "https://api.henslowe.com/api";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
