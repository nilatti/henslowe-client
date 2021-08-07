import axios from "axios";
export const baseUrl = "http://google.com";
// "http://hcapi-env.eba-epmrxskb.us-east-1.elasticbeanstalk.com/api";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `${window.localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
