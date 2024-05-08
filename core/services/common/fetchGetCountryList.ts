import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getCountryListAPIURL } from "@/core/routes/common";
import { I_GetCountryListSuccessResponse } from "@/core/models/common";

export const fetchGetCountryList = async () => {
  const res = await axiosInterceptorInstance
    .get(getCountryListAPIURL())
    .then((res: AxiosResponse<I_GetCountryListSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
