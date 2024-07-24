"use client";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetAssetTypeDetails } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAssetTypeDetails = (id: string) => {
  const query = useQuery<
    I_GetAssetTypeSuccessResponse["data"][0],
    I_GetErrorResponse
  >({
    queryKey: ["getAssetTypeDetails", id],
    queryFn: () => fetchGetAssetTypeDetails(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    enabled: !!id,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
