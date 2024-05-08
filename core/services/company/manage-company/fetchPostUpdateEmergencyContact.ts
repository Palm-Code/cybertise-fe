import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { postUpdateEmergencyContactAPIURL } from "@/core/routes/company/manage-company";
import { I_StaffRequestType } from "@/core/models/company/manage-company";

export const fetchPostUpdateEmergencyContact = async (
  payload: I_StaffRequestType
) => {
  const url = postUpdateEmergencyContactAPIURL();
  return await axiosInterceptorInstance
    .post(url, {
      emergency_contact_person: payload.name,
      emergency_email: payload.email,
      emergency_phone: payload.phone,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
