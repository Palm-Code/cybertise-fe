import { getAnalyticsAPIURL } from "@/core/routes/common/analytics/get_analytics";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { AxiosResponse } from "axios";
import {
  I_GetAnalyticsParamsPayload,
  I_GetAnalyticsSuccessResponse,
} from "@/core/models/common/analytics";

export const fetchGetAnalytics = async (
  params: I_GetAnalyticsParamsPayload
) => {
  const url = getAnalyticsAPIURL();
  return await axiosInterceptorInstance
    .get(url, {
      params: params,
    })
    .then((res: AxiosResponse<I_GetAnalyticsSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
