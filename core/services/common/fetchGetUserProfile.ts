import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getUserProfileAPIURL } from "@/core/routes/common";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";

export const fetchGetUserProfile = async () => {
  const res = await axiosInterceptorInstance
    .get(getUserProfileAPIURL())
    .then((res: AxiosResponse<I_GetUserProfileSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
