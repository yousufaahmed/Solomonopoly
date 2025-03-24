// axiosConfig.js
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const api = axios.create({
  baseURL: "yousufaa.pythonanywhere.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const response = await axios.post("yousufaa.pythonanywhere.com/api/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccess = response.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ This is the fix:
export default api;
