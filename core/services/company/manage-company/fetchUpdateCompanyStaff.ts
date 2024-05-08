import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { updateCompanyStaffAPIURL } from "@/core/routes/company/manage-company";
import { I_StaffRequestType } from "@/core/models/company/manage-company";

export const fetchUpdateCompanyStaff = async (
  payload: I_StaffRequestType,
  id: string
) => {
  const url = updateCompanyStaffAPIURL(id);
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
