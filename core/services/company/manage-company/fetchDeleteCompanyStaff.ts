import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { deleteCompanyStaffAPIURL } from "@/core/routes/company/manage-company";

export const fetchDeleteCompanyStaff = async (id: string) => {
  const url = deleteCompanyStaffAPIURL(id);
  return await axiosInterceptorInstance
    .delete(url)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
