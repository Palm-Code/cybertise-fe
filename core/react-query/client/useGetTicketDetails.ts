"use client";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetTicketDetails } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTicketDetails = (id: string) => {
  const query = useQuery<
    I_GetChatListSuccessResponse["data"][0],
    I_GetErrorResponse
  >({
    queryKey: ["getTicketDetails", id],
    queryFn: () => fetchGetTicketDetails(id),
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
    staleTime: 6 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return query;
};
