"use client";
import {
  I_GetChatListItemSuccessResponse,
  I_GetParamsPayload,
} from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetChatListItem } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetChatListItem = (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const query = useQuery<I_GetChatListItemSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getChatListItem",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: () =>
      fetchGetChatListItem({
        ...payload,
        params: {
          ...payload?.params,
          filter: {
            ...payload?.params?.filter,
            chat_ticket_id: id,
          },
        },
      }),
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });

  return query;
};
