import { fetchGetUserData } from "@/core/services/server";
import { QueryClient } from "@tanstack/react-query";

export const prefetchGetUserData = async () => {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["getUserData"],
    queryFn: () => fetchGetUserData(),
  });

  return data;
};
