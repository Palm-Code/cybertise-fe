import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postSelfDeactivatedAPIURL } from "@/core/routes/auth/self-deactivated-account";

export const fetchPostSelfDeactivatedAccount = async (payload: string) => {
  const url = postSelfDeactivatedAPIURL();
  return await axiosInterceptorInstance
    .post(url, {
      password: payload,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
