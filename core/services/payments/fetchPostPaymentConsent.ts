import { postPaymentConsentAPIURL } from "@/core/routes/payments/payment";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { AxiosResponse } from "axios";
import { I_PostPaymentConsentSuccessResponse } from "@/core/models/payments";

export async function fetchPostPaymentConsent() {
  const response = await axiosInterceptorInstance
    .post(postPaymentConsentAPIURL(), null)
    .then(
      (res: AxiosResponse<I_PostPaymentConsentSuccessResponse["data"]>) =>
        res.data
    )
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });

  return response;
}
