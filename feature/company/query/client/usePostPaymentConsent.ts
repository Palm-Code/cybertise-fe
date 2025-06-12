import { useMutation } from "@tanstack/react-query";
import { fetchPostPaymentConsent } from "@/core/services/payments";

export const usePostPaymentConsent = () => {
  return useMutation({
    mutationFn: fetchPostPaymentConsent,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });
};
