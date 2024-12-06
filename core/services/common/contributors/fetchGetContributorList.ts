import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { AxiosError, AxiosResponse } from "axios";
import { I_GetParamsPayload } from "@/core/models/common";
import { getContributorListAPIURL } from "@/core/routes/common/collaborators";
import { I_GetContributorsSuccessResponse } from "@/core/models/common/contributors";

export const fetchGetContributorList = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getContributorListAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetContributorsSuccessResponse>) => res.data)
    .catch((err: AxiosError) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
