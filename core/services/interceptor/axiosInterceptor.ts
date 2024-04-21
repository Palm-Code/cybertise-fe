"use client";
import Cookies from "universal-cookie";
import axios from "axios";
import { BASE_URL } from "@/utils/config";
import { useEffect } from "react";

const axiosInterceptorInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosInterceptor = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const requestIntercept = axiosInterceptorInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axiosInterceptorInstance.interceptors.request.eject(requestIntercept);
    };
  }, [token]);

  return axiosInterceptorInstance;
};
export default axiosInterceptor;
