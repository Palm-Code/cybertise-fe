import { getSession } from "@/service/server/session";
import axios from "axios";
import { toast } from "sonner";

const axiosServerInterceptorInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosServerInterceptorInstance.interceptors.request.use(
  async (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const session = await getSession();

    // If token is present, add it to request's Authorization Header
    if (session?.user.token) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosServerInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  async (error) => {
    if (error?.response?.data.code === 401) {
      try {
        await axios.get("/api/logout").then(() => {
          toast.error("Session expired, please login again");
        });
      } catch (err) {
        console.error("Failed to call logout route:", err);
      }
    }
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosServerInterceptorInstance;
