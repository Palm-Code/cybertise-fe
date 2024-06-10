import { AxiosResponse } from "axios";
import { getVerifyTwoFactorAPIURL } from "@/core/routes/auth/two-factor/two_factor";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchGetVerifyTwoFactor = async (payload: string) => {
  const url = getVerifyTwoFactorAPIURL();
  return await axiosInterceptorInstance
    .post(url, {
      totp: payload,
    })
    .then((res: AxiosResponse<any>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
