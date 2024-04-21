"use client";
import {
  I_GetErrorResponse,
  I_GetProgramListPayload,
  I_GetProgramListSuccessResponse,
} from "@/core/models/hacker/programs";
import { fetchGetProgramList } from "@/core/services/hacker/programs/fetchGetProgramList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetProgramList = (payload?: I_GetProgramListPayload) => {
  const query = useQuery<I_GetProgramListSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getProgramList",
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: () => fetchGetProgramList(payload),
    placeholderData: keepPreviousData,
  });

  return query;
};
