"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { I_GetCompanyDetailsSuccessResponse } from "@/core/models/mediator/companies";
import { fetchGetCompaniesDetail } from "@/core/services/mediator/companies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetCompaniesDetail = (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const query = useQuery<
    I_GetCompanyDetailsSuccessResponse,
    I_GetErrorResponse
  >({
    queryKey: [
      "getCompaniesDetail",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: () => fetchGetCompaniesDetail(payload, id),
    placeholderData: keepPreviousData,
  });

  return query;
};
