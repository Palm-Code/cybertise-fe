import { AxiosResponse } from "axios";
import { I_StaffRequestType } from "@/core/models/company/settings";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postCompanyStaffAPIURL } from "@/core/routes/company/manage-company";

export const fetchPostCompanyStaff = async (payload: I_StaffRequestType) => {
  const url = postCompanyStaffAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
