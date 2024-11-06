import { fetchGetUserData } from "@/core/services/server";
import { QueryClient } from "@tanstack/react-query";

export const prefetchGetUserData = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["getServerUserData"],
    queryFn: () => fetchGetUserData(),
  });

  return data;
};
