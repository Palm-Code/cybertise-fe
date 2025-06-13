"use client";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { fetchGetAssetType } from "@/core/services/common";
import { initialState } from "@/core/zustands/asset-type/store";
import { useQuery } from "@tanstack/react-query";
export const useGetAssetType = () => {
  const { data } = useQuery({
    queryKey: ["assetType"],
    queryFn: () => fetchGetAssetType(),
  });

  const filteredAssetTypes: I_GetAssetTypeSuccessResponse["data"] = data
    ? data.data.map((item) => {
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
