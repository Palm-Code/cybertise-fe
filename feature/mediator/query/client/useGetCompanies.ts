"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import { fetchGetCompanies } from "@/core/services/mediator/companies";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export const useGetCompanies = (payload?: I_GetParamsPayload) => {
  const queryInfinity = useInfiniteQuery({
    queryKey: [
      "getcCompaniesMobile",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: (pageParam) =>
      fetchGetCompanies({
        params: {
          ...payload?.params,
          page: {
            size: 10,
            number: pageParam.pageParam,
          },
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.current_page !== lastPage.meta?.last_page
        ? (lastPage?.meta?.current_page ?? 0) + 1
        : undefined;
    },
  });

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

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return { queryDesktop: query, queryMobile: queryInfinity };
};
