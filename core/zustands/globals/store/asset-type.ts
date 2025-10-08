import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { create } from "zustand";

export type AssetTypeState = I_GetAssetTypeSuccessResponse["data"];

export const useAssetTypeStore = create<{ data: AssetTypeState }>(() => ({
  data: [],
}));
