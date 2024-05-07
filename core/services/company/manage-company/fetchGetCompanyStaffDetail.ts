import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { getCompanyStaffDetailAPIURL } from "@/core/routes/company/manage-company";
import { I_GetStaffSuccessResponse } from "@/core/models/company/settings";

export const fetchGetCompanyStaffDetail = async (id: string) => {
  const res = await axiosInterceptorInstance
    .get(getCompanyStaffDetailAPIURL(id))
    .then((res: AxiosResponse<I_GetStaffSuccessResponse["data"][0]>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
