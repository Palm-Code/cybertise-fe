"use client";
import { I_GetErrorRes } from "@/core/models/common";
import {
  CreateVrpType,
  I_GetCreateVrpListSuccessResponse,
} from "@/core/models/common/post_create_vrp";
import { fetchPostUpdateVrp } from "@/core/services/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdateVrp = (id: string) => {
  const mutations = useMutation<
    I_GetCreateVrpListSuccessResponse,
    I_GetErrorRes,
    CreateVrpType
  >({
    mutationKey: ["usePostUpdateVrp"],
    mutationFn: (payload) => {
      return fetchPostUpdateVrp(payload, id);
    },
  });

  if (mutations.isError) {
    toast.error("Failed to send VRP");
  }

  return mutations;
};
