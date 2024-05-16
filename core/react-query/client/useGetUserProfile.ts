"use client";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetUserProfile } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  const query = useQuery<I_GetUserProfileSuccessResponse, I_GetErrorResponse>({
    queryKey: ["getUserProfile"],
    queryFn: () => fetchGetUserProfile(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return query;
};
