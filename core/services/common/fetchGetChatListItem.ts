import { AxiosResponse } from "axios";
import { I_GetParamsPayload } from "@/core/models/common";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getChatListItemAPIURL } from "@/core/routes/common";
import { I_GetChatListItemSuccessResponse } from "@/core/models/common/get_chat_list_item";

export const fetchGetChatListItem = async (payload?: I_GetParamsPayload) => {
  const res = await axiosInterceptorInstance
    .get(getChatListItemAPIURL(), {
      params: payload?.params,
    })
    .then((res: AxiosResponse<I_GetChatListItemSuccessResponse>) => {
      return res.data;
    })
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
