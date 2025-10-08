import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import {
  I_GetResendVerificationRequest,
  I_GetResendVerificationSuccessResponse,
} from "@/core/models/auth/resend-verification";
import { getResendVerificationAPIURL } from "@/core/routes/auth/resend-verification";

export const fetchPostResendVerification = async (
  payload: I_GetResendVerificationRequest
) => {
  const url = getResendVerificationAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then(
      (res: AxiosResponse<I_GetResendVerificationSuccessResponse["data"]>) => {
        return res.data;
      }
    )
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
