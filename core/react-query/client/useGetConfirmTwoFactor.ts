"use client";
import { fetchGetConfirmTwoFactor } from "@/core/services/auth/two-factor/fetchGetConfirmTwoFactor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetConfirmTwoFactor = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetchGetConfirmTwoFactor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
      toast.success("Successfully activated two factor", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
