import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getChatListDetailAPIURL } from "@/core/routes/common";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";

export const fetchGetTicketDetails = async (id: string) => {
  const res = await axiosInterceptorInstance
    .get(getChatListDetailAPIURL(id))
    .then(
      (
        res: AxiosResponse<{ data: I_GetChatListSuccessResponse["data"][0] }>
      ) => {
        return res.data.data;
      }
    )
    .catch((err) => {
      throw err?.response?.data || err?.response;
    });

  return res;
};
