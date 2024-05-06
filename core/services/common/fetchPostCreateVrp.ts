import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { postCreateVrpAPIURL } from "@/core/routes/common";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";

export const fetchPostCreateVrp = async (payload: CreateVrpType) => {
  const url = postCreateVrpAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
