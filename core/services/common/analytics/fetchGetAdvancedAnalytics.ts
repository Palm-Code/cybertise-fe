import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { getAdvancedAnalyticsAPIURL } from "@/core/routes/common/analytics";
import { AxiosResponse } from "axios";
import {
  I_GetAnalyticsParamsPayload,
  I_GetAnalyticsSuccessResponse,
} from "@/core/models/common/analytics";

export const fetchGetAdvancedAnalytics = async (
  params: I_GetAnalyticsParamsPayload
) => {
  const url = getAdvancedAnalyticsAPIURL();
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
