import { logout } from "@/service/server/auth";
import { BASE_URL } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const axiosFormDataInterceptorInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptor
axiosFormDataInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const cookie = Cookies;
    const accessToken = cookie.get("token");

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers["Content-Type"] = "multipart/form-data";
      }
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosFormDataInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    if (error?.response?.data.code === 401) {
      logout();
      return toast.error("Session expired, please login again");
    }
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosFormDataInterceptorInstance;
