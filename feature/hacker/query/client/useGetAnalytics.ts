import { I_GetErrorResponse } from "@/core/models/common";
import {
  I_GetAnalyticsParamsPayload,
  I_GetAnalyticsSuccessResponse,
} from "@/core/models/common/analytics";
import { fetchGetAnalytics } from "@/core/services/common/analytics";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";

export const useGetAnalytics = () => {
  const [{ ticket_status, interval }] = useQueryStates({
    ticket_status: parseAsString,
    interval: parseAsInteger,
  });
  const payloads: I_GetAnalyticsParamsPayload = {
    ticket_status: ticket_status ?? "Open",
    interval: interval ?? 7,
  };
  const query = useQuery<I_GetAnalyticsSuccessResponse, I_GetErrorResponse>({
    queryKey: ["analytics"],
    queryFn: () => fetchGetAnalytics(payloads),
  });

  return query;
};
