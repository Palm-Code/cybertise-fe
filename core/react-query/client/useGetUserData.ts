"use client";
import { I_GetUserDataSuccessResponse } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetUserData } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetUserData = () => {
  const query = useQuery<
    I_GetUserDataSuccessResponse["data"],
    I_GetErrorResponse
  >({
    queryKey: ["getUserData"],
    queryFn: () => fetchGetUserData(),
    refetchOnMount: false,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
