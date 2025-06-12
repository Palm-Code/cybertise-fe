import { postPaymentRequestedAPIURL } from "@/core/routes/payments/payment";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { AxiosResponse } from "axios";
import {
  I_PostMakePaymentPayload,
  I_PostPaymentChargeSuccessResponse,
} from "@/core/models/payments";

export async function fetchPostPaymentRequested(
  id: string,
  payload: I_PostMakePaymentPayload
) {
  const response = await axiosInterceptorInstance
    .post(postPaymentRequestedAPIURL(id), payload)
    .then(
      (res: AxiosResponse<I_PostPaymentChargeSuccessResponse["data"]>) =>
        res.data
    )
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });

  return response;
}
