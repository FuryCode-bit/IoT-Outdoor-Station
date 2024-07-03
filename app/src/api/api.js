import axios from "axios";

const api = axios.create({
  baseURL: "[API_URL]",
  headers: {
    'authorizationToken': "token",
  },
});

export default api;