"use client";
import {
  I_GetActivityListSuccessResponse,
  I_GetActivityParamsRequest,
} from "@/core/models/company/manage-company/activity_log";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetActivityLog } from "@/core/services/company/manage-company";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetActivityLog = (payload: I_GetActivityParamsRequest) => {
  const query = useQuery<I_GetActivityListSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getActivityLog",
      payload?.params?.page,
      payload?.params?.sort,
      payload.params?.date_finish,
    ],
    queryFn: () => fetchGetActivityLog(payload),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
