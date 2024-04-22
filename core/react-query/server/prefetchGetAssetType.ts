import { fetchGetAssetType } from "@/core/services/common/fetchGetAssetType";
import { useCommonStore } from "@/core/zustands/asset-type/store";
import { QueryClient } from "@tanstack/react-query";

export async function prefetchGetAssetType(token: string) {
  const store = useCommonStore.getState();
  const queryClient = new QueryClient();
  return await queryClient.prefetchQuery({
    queryKey: ["getAssetType"],
    retry: 5,
    queryFn: () =>
      fetchGetAssetType(token)
        .then((res) => {
          if (res.data) {
            const data = res.data.map((item) => {
              return {
                id: item.id,
                value: item.label,
                label: item.value,
              };
            });
            store.setValue(data);
            return res.data;
          }
        })
        .catch((err) => {
          throw err?.response?.data || err?.response;
        }),
  });
}
