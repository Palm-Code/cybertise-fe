import { useMutation } from "@tanstack/react-query";
import { fetchGetBillingPortal } from "@/core/services/payments";

export const useGetBillingPortal = () => {
  return useMutation({
    mutationFn: fetchGetBillingPortal,
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, "_blank");
      }
    },
  });
};
