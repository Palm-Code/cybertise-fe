"use client";
import { useGetRole } from "@/core/hooks";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { fetchGetProgramDetails } from "@/core/services/hacker/programs/fetchProgramDetails";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetProgramDetails = (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const role = useGetRole();
  const query = useQuery<
    I_GetProgramDetailsSuccessResponse,
    I_GetErrorResponse
  >({
    queryKey: [
      "getProgramListDetails",
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: () =>
      fetchGetProgramDetails(payload, id as string).then((res) => {
        if (res.data.status !== "Published" && role === "company staff") {
          window.location.href = "/vrp-launchpad";
        }
        return res;
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  return query;
};
