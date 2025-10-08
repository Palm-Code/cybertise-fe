import { getPaymentReceiptAPIURL } from "@/core/routes/payments/payment";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { AxiosResponse } from "axios";
import { I_PostPaymentReceiptSuccessResponse } from "@/core/models/payments";

export async function fetchGetPaymentReceipt(id: string) {
  const response = await axiosInterceptorInstance
    .get(getPaymentReceiptAPIURL(id))
    .then(
      (res: AxiosResponse<I_PostPaymentReceiptSuccessResponse["data"]>) =>
        res.data
    )
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });

  return response;
}
