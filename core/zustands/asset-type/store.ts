import { StateCreator, create } from "zustand";
export interface AssetTypeSlice {
  data: {
    id: string;
    value: string;
    label: string;
  }[];
  setValue: (value: AssetTypeSlice["data"]) => void;
}

const initialState: AssetTypeSlice = {
  data: [
    {
      id: "",
      value: "all",
      label: "All type",
    },
  ],
  setValue: (value) => {
    initialState.data = value;
  },
};

const createAssetTypeSlice: StateCreator<
  CommonStoreSlice,
  [],
  [],
  AssetTypeSlice
> = (set) => ({
  ...initialState,
  setValue: (value: AssetTypeSlice["data"]) => {
    const newValue = [...initialState.data, ...value];
    set((state) => ({
      ...state,
      data: newValue,
    }));
  },
});

export type CommonStoreSlice = AssetTypeSlice;

export const useCommonStore = create<CommonStoreSlice>()((...a) => ({
  ...createAssetTypeSlice(...a),
}));
