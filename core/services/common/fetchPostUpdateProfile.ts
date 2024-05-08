import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { postUpdateProfileAPIURL } from "@/core/routes/common";
import { I_UpdateProfile } from "@/core/models/company/settings";

export const fetchPostUpdateProfile = async (payload: I_UpdateProfile) => {
  const url = postUpdateProfileAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
