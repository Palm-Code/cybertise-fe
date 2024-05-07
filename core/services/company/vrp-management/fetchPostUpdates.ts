import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { UpdateFormRequestType } from "@/core/models/company/vrp-management/publish_update";
import { postUpdateAPIURL } from "@/core/routes/company/vrp-management";

export const fetchPostUpdates = async (payload: UpdateFormRequestType) => {
  const url = postUpdateAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
