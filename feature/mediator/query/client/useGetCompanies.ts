"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import { fetchGetCompanies } from "@/core/services/mediator/companies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCompanies = (payload?: I_GetParamsPayload) => {
  const query = useQuery<I_GetCompaniesSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getcCompanies",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: () => fetchGetCompanies(payload),
    placeholderData: keepPreviousData,
  });

  return query;
};
