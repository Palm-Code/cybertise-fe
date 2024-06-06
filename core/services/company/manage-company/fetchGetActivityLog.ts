import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { getActivityLog } from "@/core/routes/company/manage-company";
import {
  I_GetActivityListSuccessResponse,
  I_GetActivityParamsRequest,
} from "@/core/models/company/manage-company/activity_log";

export const fetchGetActivityLog = async (
  payload: I_GetActivityParamsRequest
) => {
  const res = await axiosInterceptorInstance
    .get(getActivityLog(), payload)
    .then((res: AxiosResponse<I_GetActivityListSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
