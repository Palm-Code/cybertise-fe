"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchDeleteCompanyStaff } from "@/core/services/company/manage-company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostDeleteStaff = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutations = useMutation<[], I_GetErrorRes, string>({
    mutationFn: (id) => {
      return fetchDeleteCompanyStaff(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile"],
      });
      router.back();
      toast.success("Staff has been deleted", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      mutations.reset();
      toast.error(error.message, {
        position: "bottom-right",
        action: {
          label: "retry",
          onClick: () => {
            mutations.mutateAsync(mutations.variables as string);
          },
        },
        cancel: {
          label: "Close",
          onClick: () => {
            toast.dismiss();
          },
        },
        duration: 3000,
      });
    },
  });

  return mutations;
};
