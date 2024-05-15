import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetParamsPayload } from "@/core/models/common";
import { getCompaniesDetailAPIURL } from "@/core/routes/mediator/companies";
import { I_GetCompanyDetailsSuccessResponse } from "@/core/models/mediator/companies";

export const fetchGetCompaniesDetail = async (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const res = await axiosInterceptorInstance
    .get(getCompaniesDetailAPIURL(id as string), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetCompanyDetailsSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
