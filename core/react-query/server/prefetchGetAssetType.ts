import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { fetchGetAssetType } from "@/core/services/common/fetchGetAssetType";
import { useCommonStore } from "@/core/zustands/asset-type/store";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchGetAssetType(token: string) {
  const store = useCommonStore.getState();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getAssetType"],
    queryFn: () => fetchGetAssetType(token),
  });

  const data = queryClient.getQueryData(["getAssetType"]) as
    | I_GetAssetTypeSuccessResponse
    | undefined;

  const assetData = data
    ? data.data.map((item) => {
        return {
          id: item.id,
          value: item.label,
          label: item.value,
        };
      })
    : [];

  store.setValue(assetData);
}
