import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { getProgramListAPIURL } from "@/core/routes/hacker/programs";
import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetParamsPayload } from "@/core/models/common";

export const fetchGetProgramList = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getProgramListAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetProgramListSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      console.log("err", err);
      throw err?.response?.data || err?.response;
    });

  return res;
};
