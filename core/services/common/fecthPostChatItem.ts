import { AxiosResponse } from "axios";
import { postChatItemAPIURL } from "@/core/routes/common";
import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";

export const fetchPostChatItem = async (
  payload: I_GetChatListItemSuccessResponse["data"][0]
) => {
  const url = postChatItemAPIURL();
  return await axiosInterceptorInstance
    .post(url, payload)
    .then((res: AxiosResponse<I_GetChatListItemSuccessResponse["data"][0]>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });
};
