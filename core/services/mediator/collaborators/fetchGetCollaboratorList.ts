import { getCollaboratorListAPIURL } from "@/core/routes/mediator/collaborators";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import { AxiosError, AxiosResponse } from "axios";
import { I_GetParamsPayload } from "@/core/models/common";

export const fetchGetCollaboratorList = async (
  payload?: I_GetParamsPayload
) => {
  const res = await axiosInterceptorInstance
    .get(getCollaboratorListAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetCollaboratorSuccessResponse>) => res.data)
    .catch((err: AxiosError) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
