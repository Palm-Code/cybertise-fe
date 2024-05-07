"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { I_StaffRequestType } from "@/core/models/company/settings";
import { fetchPostCompanyStaff } from "@/core/services/company/manage-company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostCreateStaff = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutations = useMutation<[], I_GetErrorRes, I_StaffRequestType>({
    mutationFn: (payload) => {
      return fetchPostCompanyStaff(payload);
    },
  });

  if (mutations.error) {
    mutations.reset();
    toast.error(mutations.error.message, {
      position: "bottom-right",
      action: {
        label: "retry",
        onClick: () => {
          mutations.mutateAsync(mutations.variables as I_StaffRequestType);
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
  }

  if (mutations.isSuccess) {
    toast.success("Staff has been created", {
      position: "bottom-right",
      cancel: {
        label: "Close",
        onClick: () => {
          queryClient.invalidateQueries({
            queryKey: ["getUserProfile"],
          });
          router.back();
        },
      },
      onDismiss: () => {
        queryClient.invalidateQueries({
          queryKey: ["getUserProfile"],
        });
        router.back();
      },
      onAutoClose: () => {
        queryClient.invalidateQueries({
          queryKey: ["getUserProfile"],
        });
        router.back();
      },
    });
  }

  return mutations;
};
