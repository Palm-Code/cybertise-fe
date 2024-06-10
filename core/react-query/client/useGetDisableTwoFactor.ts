"use client";
import { fetchGetDisableTwoFactor } from "@/core/services/auth/two-factor/fetchGetDisableTwoFactor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetDisableTwoFactor = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetchGetDisableTwoFactor,
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["getUserProfile"] });
      toast.success("Successfully disabled two factor", {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
