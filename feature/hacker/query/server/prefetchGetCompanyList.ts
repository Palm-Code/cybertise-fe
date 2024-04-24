import { fetchGetProgramList } from "@/core/services/hacker/programs/fetchGetProgramList";
import { QueryClient } from "@tanstack/react-query";

export const prefetchGetCompanyList = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getProgramList"],
    queryFn: () => fetchGetProgramList(),
  });

  return { queryClient };
};
