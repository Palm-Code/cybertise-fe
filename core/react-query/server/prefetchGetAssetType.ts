import { fetchGetAssetType } from "@/core/services/server";
import { QueryClient } from "@tanstack/react-query";

export const prefetchGetAssetType = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["getServerAssetType"],
    queryFn: () => fetchGetAssetType(),
  });

  return data;
};
