"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetChatList } from "@/core/services/hacker/dashboard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetChatList = (payload?: I_GetParamsPayload) => {
  const query = useQuery<I_GetChatListSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getChatList",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    refetchOnMount: !!payload?.params?.filter?.company_id ? false : true,
    queryFn: () => fetchGetChatList(payload),
    placeholderData: keepPreviousData,
  });

  return query;
};
