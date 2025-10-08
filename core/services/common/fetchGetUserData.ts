import axios, { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getUserDataAPIURL } from "@/core/routes/common";
import { I_GetUserDataSuccessResponse } from "@/core/models/common";

export const fetchGetUserData = async () => {
  const res = await axiosInterceptorInstance
    .get(getUserDataAPIURL())
    .then(async (res: AxiosResponse<I_GetUserDataSuccessResponse["data"]>) => {
      if (res.data.language) {
        await axios.post("/api/set-language", {
          language: res.data.language,
        });
      }
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
