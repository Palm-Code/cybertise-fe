"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetTargetAssetSuccessResponse } from "@/core/models/common/get_target_asset";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetTargetAssetDetails } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTargetAssetDetails = (id: string) => {
  const query = useQuery<
    I_GetTargetAssetSuccessResponse["data"][0],
    I_GetErrorResponse
  >({
    queryKey: ["getTargetAssetDetails", id],
    queryFn: () => fetchGetTargetAssetDetails(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    enabled: !!id,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
