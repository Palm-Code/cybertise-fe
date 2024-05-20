"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetTargetAssetSuccessResponse } from "@/core/models/common/get_target_asset";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetTargetAsset } from "@/core/services/common/fetchGetTargetAsset";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTargetAsset = (payload?: I_GetParamsPayload) => {
  const query = useQuery<I_GetTargetAssetSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getTargetAsset",
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: () => fetchGetTargetAsset(payload),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
