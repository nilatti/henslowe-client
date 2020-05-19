import axios from 'axios';

export default axios.create({
  baseURL: `https://henslowescloud.com:3001/api/`,
  headers: {"Authorization" : `${window.localStorage.getItem('token')}`}
});
