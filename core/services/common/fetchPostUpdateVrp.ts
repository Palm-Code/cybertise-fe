import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { postUpdateVrpAPIURL } from "@/core/routes/common";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";

export const fetchPostUpdateVrp = async (
  payload: CreateVrpType,
  id: string
) => {
  const url = postUpdateVrpAPIURL(id);
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
