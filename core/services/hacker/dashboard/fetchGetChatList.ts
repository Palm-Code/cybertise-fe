import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../../interceptor/axiosInterceptor";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { getChatListAPIURL } from "@/core/routes/hacker/dashboard";
import { I_GetParamsPayload } from "@/core/models/common";

export const fetchGetChatList = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getChatListAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetChatListSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
