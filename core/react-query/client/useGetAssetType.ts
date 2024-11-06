"use client";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetParamsPayload,
} from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetAssetType } from "@/core/services/common/fetchGetAssetType";
import { initialState } from "@/core/zustands/asset-type/store";
import { useAssetTypeStore } from "@/core/zustands/globals/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAssetType = (payload?: I_GetParamsPayload) => {
  const { data } = useAssetTypeStore.getState();

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
