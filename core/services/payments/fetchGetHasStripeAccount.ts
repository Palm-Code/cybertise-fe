import {
  I_GetHasStripeAccountStatusResponse,
  I_GetHasStripeAccountStatusSuccessResponse,
} from "@/core/models/payments";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getHasStripeAccountAPIURL } from "@/core/routes/payments";
import { AxiosResponse } from "axios";

export async function fetchGetHasStripeAccount() {
  const response = await axiosInterceptorInstance
    .get(getHasStripeAccountAPIURL())
    .then((res: AxiosResponse<I_GetHasStripeAccountStatusResponse>) => res.data)
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });

  return response;
}
