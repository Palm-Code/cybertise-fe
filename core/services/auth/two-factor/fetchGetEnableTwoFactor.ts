import { AxiosResponse } from "axios";
import { getEnableTwoFactorAPIURL } from "@/core/routes/auth/two-factor/two_factor";
import {
  I_GetEnableTwoFactorResponsePayload,
  I_GetEnableTwoFactorSuccessResponse,
} from "@/core/models/auth/two_factor/get_two_factor";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";

export const fetchGetEnableTwoFactor = async (
  payload: I_GetEnableTwoFactorResponsePayload
) => {
  const url = getEnableTwoFactorAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<I_GetEnableTwoFactorSuccessResponse["data"]>) => {
      return res;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
