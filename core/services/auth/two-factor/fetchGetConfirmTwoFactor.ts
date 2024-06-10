import { AxiosResponse } from "axios";
import { getConfirmTwoFactorAPIURL } from "@/core/routes/auth/two-factor/two_factor";
import { I_GetConfirmTwoFactorResponsePayload } from "@/core/models/auth/two_factor/get_two_factor";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchGetConfirmTwoFactor = async (
  payload: I_GetConfirmTwoFactorResponsePayload
) => {
  const url = getConfirmTwoFactorAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
