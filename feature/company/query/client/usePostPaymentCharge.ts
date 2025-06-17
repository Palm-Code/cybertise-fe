import { useMutation } from "@tanstack/react-query";
import { fetchPostPaymentRequested } from "@/core/services/payments";
import { toast } from "sonner";
import {
  I_PostMakePaymentPayload,
  I_PostPaymentChargeSuccessResponse,
} from "@/core/models/payments";
import { useQueryClient } from "@tanstack/react-query";

export const usePostPaymentRequested = () => {
  const queryClient = useQueryClient();
  return useMutation<
    I_PostPaymentChargeSuccessResponse["data"],
    Error,
    {
      id: string;
      payload: I_PostMakePaymentPayload;
    }
  >({
    mutationFn: ({ id, payload }) => fetchPostPaymentRequested(id, payload),
    onSuccess: (data) => {
      toast.success("Payment requested successfully");
      queryClient.invalidateQueries({ queryKey: ["getChatList"] });
      queryClient.invalidateQueries({ queryKey: ["getTicketDetails"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
};
