import { getHackerListAPIURL } from "@/core/routes/mediator/collaborators";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetHackerSuccessResponse } from "@/core/models/mediator/collaborators";
import { AxiosError, AxiosResponse } from "axios";
import { I_GetParamsPayload } from "@/core/models/common";

export const fetchGetHackerList = async (
  id: string,
  payload?: I_GetParamsPayload
) => {
  const res = await axiosInterceptorInstance
    .get(getHackerListAPIURL(id), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetHackerSuccessResponse>) => res.data)
    .catch((err: AxiosError) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
