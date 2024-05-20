"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { fetchGetProgramDetails } from "@/core/services/hacker/programs/fetchProgramDetails";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetProgramDetails = (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const query = useQuery<
    I_GetProgramDetailsSuccessResponse,
    I_GetErrorResponse
  >({
    queryKey: [
      "getProgramListDetails",
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: () => fetchGetProgramDetails(payload, id as string),
    placeholderData: keepPreviousData,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
