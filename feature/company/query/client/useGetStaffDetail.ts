"use client";
import { I_GetStaffSuccessResponse } from "@/core/models/company/manage-company";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetCompanyStaffDetail } from "@/core/services/company/manage-company";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStaffDetail = (id?: string) => {
  const query = useQuery<
    I_GetStaffSuccessResponse["data"][0],
    I_GetErrorResponse
  >({
    queryKey: ["getStaffDetail"],
    queryFn: () => fetchGetCompanyStaffDetail(id as string),
    placeholderData: keepPreviousData,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
