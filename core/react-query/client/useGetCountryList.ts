"use client";
import { I_GetCountryListSuccessResponse } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetCountryList } from "@/core/services/common";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCountryList = () => {
  const query = useQuery<I_GetCountryListSuccessResponse, I_GetErrorResponse>({
    queryKey: ["getCountryList"],
    queryFn: () => fetchGetCountryList(),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return query;
};
