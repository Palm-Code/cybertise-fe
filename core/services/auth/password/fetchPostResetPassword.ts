import { AxiosResponse } from "axios";
import { BASE_URL } from "@/utils/config";
import { postResetPasswordAPIURL } from "@/core/routes/auth/password";
import { I_GetResetPasswordRequest } from "@/core/models/auth/forgot-password";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchPostResetPassword = async (
  payload: I_GetResetPasswordRequest
) => {
  const url = postResetPasswordAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
