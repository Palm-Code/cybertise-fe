"use server";
import { getPaymentStatusAPIURL } from "@/core/routes/payments/payment";
import { I_GetPaymentStatusSuccessResponse } from "@/core/models/payments";
import axiosServerInterceptorInstance from "../interceptor/axiosServerInterceptor";

export async function fetchGetPaymentStatus(): Promise<
  I_GetPaymentStatusSuccessResponse["data"]
> {
  const response = await axiosServerInterceptorInstance
    .get(getPaymentStatusAPIURL())
    .then((res) => res.data)
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });

  return response;
}
