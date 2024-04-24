import { getProgramListDetailAPIURL } from "@/core/routes/hacker/programs";
import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";

export const fetchGetProgramDetails = async (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const res = await axiosInterceptorInstance
    .get(getProgramListDetailAPIURL(id as string), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetProgramDetailsSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
