import axios from "axios";

const baseURL = "https://todo-backend-xglk.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
