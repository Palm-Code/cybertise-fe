import { AxiosResponse } from "axios";
import { getDisableTwoFactorAPIURL } from "@/core/routes/auth/two-factor/two_factor";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchGetDisableTwoFactor = async (password: string) => {
  const url = getDisableTwoFactorAPIURL();
  return await axiosInterceptorInstance
    .post(url, { password: password })
    .then((res: AxiosResponse<any>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
