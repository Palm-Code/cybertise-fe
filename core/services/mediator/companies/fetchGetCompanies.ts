import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetParamsPayload } from "@/core/models/common";
import { getCompaniesAPIURL } from "@/core/routes/mediator/companies";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";

export const fetchGetCompanies = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getCompaniesAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetCompaniesSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
