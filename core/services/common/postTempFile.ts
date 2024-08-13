import { AxiosResponse } from "axios";
import { postFileTempAPIURL } from "@/core/routes/common";
import { I_PostTempFilesResponse } from "@/core/models/common";
import axiosFormDataInterceptorInstance from "../interceptor/axiosFormDataInterceptor";

export const fetchPostTempFiles = async (payload: FormData) => {
  const url = postFileTempAPIURL();
  return await axiosFormDataInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
