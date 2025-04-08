import axios from "axios";

const baseURL = "https://todo-backend-xglk.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("currentUser");
  if (user) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
