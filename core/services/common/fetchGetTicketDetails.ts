import { AxiosResponse } from "axios";
import axiosInterceptorInstance from "../interceptor/axiosInterceptor";
import { getChatListDetailAPIURL } from "@/core/routes/common";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { cache } from "react";

export const fetchGetTicketDetails = cache(async (id: string) => {
  const res = await axiosInterceptorInstance
    .get(getChatListDetailAPIURL(id), {
      params: {
        append: "risk_level_category",
      },
    })
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
});
