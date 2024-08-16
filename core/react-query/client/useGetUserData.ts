"use client";
import { I_GetUserDataSuccessResponse } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetUserData } from "@/core/services/common";
import { logout } from "@/service/server/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUserData = (refetch?: boolean) => {
  const query = useQuery<
    I_GetUserDataSuccessResponse["data"],
    I_GetErrorResponse
  >({
    queryKey: ["getUserData"],
    queryFn: () => fetchGetUserData(),
    refetchOnMount: refetch || false,
  });

  if (query.error) {
    if (query.error.code === 401) {
      logout();
    }
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
