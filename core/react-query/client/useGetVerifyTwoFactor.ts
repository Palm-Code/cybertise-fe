"use client";
import { fetchGetVerifyTwoFactor } from "@/core/services/auth/two-factor/fetchGetVerifyTwoFactor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetVerifyTwoFactor = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetchGetVerifyTwoFactor,
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["getUserProfile"] });
      toast.success(data.data.message, {
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
