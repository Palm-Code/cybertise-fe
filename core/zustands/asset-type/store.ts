import { StateCreator, create } from "zustand";
export interface AssetTypeSlice {
  assetType: {
    id: string;
    value: string;
    label: string;
  }[];
  setAssetType: (value: AssetTypeSlice["assetType"]) => void;
}

export const initialState: AssetTypeSlice = {
  assetType: [
    {
      id: "",
      value: "all",
      label: "All type",
    },
  ],
  setAssetType: (value) => {
    initialState.assetType = value;
  },
};

const createAssetTypeSlice: StateCreator<
  CommonStoreSlice,
  [],
  [],
  AssetTypeSlice
> = (set) => ({
  ...initialState,
  setAssetType: (value: AssetTypeSlice["assetType"]) => {
    const newValue = [...initialState.assetType, ...value];
    set((state) => ({
      ...state,
      assetType: newValue,
    }));
  },
});

export type CommonStoreSlice = AssetTypeSlice;

export const useCommonStore = create<CommonStoreSlice>()((...a) => ({
  ...createAssetTypeSlice(...a),
}));
