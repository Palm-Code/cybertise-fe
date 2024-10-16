import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { postUpdateProfileAPIURL } from "@/core/routes/common";

export const fetchPostUpdateLang = async (payload: string) => {
  const url = postUpdateProfileAPIURL();
  return await axiosInterceptorInstance
    .post(url, {
      language: payload,
    })
    .then((res: AxiosResponse<any>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
