import { BASE_URL } from "@/utils/config";
import { AxiosResponse } from "axios";
import { postFileTempAPIURL } from "@/core/routes/common";
import { I_PostTempFilesResponse } from "@/core/models/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";

export const fetchPostTempFiles = async (payload: FormData) => {
  const url = BASE_URL + postFileTempAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
