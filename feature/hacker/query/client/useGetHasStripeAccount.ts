import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGetHasStripeAccount } from "@/core/services/payments";
import { I_GetHasStripeAccountStatusResponse } from "@/core/models/payments";

export const useGetHasStripeAccount = (
  options?: Omit<
    UseQueryOptions<I_GetHasStripeAccountStatusResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["get-has-stripe-account"],
    queryFn: fetchGetHasStripeAccount,
    ...options,
  });
};
