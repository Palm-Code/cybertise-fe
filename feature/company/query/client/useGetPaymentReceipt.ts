import { useMutation } from "@tanstack/react-query";
import { fetchGetPaymentReceipt } from "@/core/services/payments";

export const useGetPaymentReceipt = () => {
  return useMutation({
    mutationFn: fetchGetPaymentReceipt,
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, "_blank");
      }
    },
  });
};
