import { BASE_URL } from "@/utils/config";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const axiosInterceptorInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = Cookies.get("token");

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  async (error) => {
    const accessToken = Cookies.get("token");
    if (error?.response?.data.code === 401) {
      await axios.post("/api/logout", {
        token: accessToken,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return toast.error("Session expired, please login again");
    }
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
