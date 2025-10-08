import { getBillingPortalAPIURL } from "@/core/routes/payments/payment";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { AxiosResponse } from "axios";
import { I_GetBillingPortalSuccessResponse } from "@/core/models/payments";

export async function fetchGetBillingPortal() {
  return axiosInterceptorInstance
    .get(getBillingPortalAPIURL())
    .then(
      (res: AxiosResponse<I_GetBillingPortalSuccessResponse["data"]>) =>
        res.data
    )
    .catch((err) => {
      throw err?.response?.data || err?.response || err;
    });
}
