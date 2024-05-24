import { AxiosResponse } from "axios";
import { postLogoutAPIURL } from "@/core/routes/auth/logout";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchPostLogout = async () => {
  const url = postLogoutAPIURL();
  return await axiosInterceptorInstance
    .post(url)
    .then((res: AxiosResponse<any>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
