"use client";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetParamsPayload,
} from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetAssetType } from "@/core/services/common/fetchGetAssetType";
import { initialState } from "@/core/zustands/asset-type/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAssetType = (payload?: I_GetParamsPayload) => {
  const query = useQuery<I_GetAssetTypeSuccessResponse, I_GetErrorResponse>({
    queryKey: ["getAssetType", payload?.params?.page, payload?.params?.filter],
    queryFn: () => fetchGetAssetType(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  const data = query.data?.data || [];
  const filteredAssetTypes = data
    ? data.map((item) => {
        return {
          id: item.id,
          value: item.label,
          label: item.value,
        };
      })
    : [];

  const newValue = [...initialState.assetType, ...filteredAssetTypes];
  return {
    data: newValue,
  };
};
