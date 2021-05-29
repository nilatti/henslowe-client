import axios from "axios";
import API from "../api/api";
import authHeader from "./auth-header";

const register = (user) => {
  return axios.post(baseUrl + "users", user); // might need to add / before 'users'
};

const refreshCacheAndReload = () => {
  localStorage.clear();
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
  // delete browser cache and hard reload
  window.location.reload(true);
};

const login = (user) => {
  localStorage.clear();
  return API.post("sign_in", { user: user }).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.headers.authorization);
    }
    return response.data;
  });
};

const logout = () => {
  return API.delete("sign_out", { headers: authHeader() }).then(
    refreshCacheAndReload()
  );
};

function checkTokenExpiration() {
  const token = JSON.parse(localStorage.getItem("token"));
  if (jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.clear();
  }
}

export default {
  checkTokenExpiration,
  register,
  login,
  logout,
};
