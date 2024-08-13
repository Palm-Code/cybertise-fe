"use client";
import { I_GetErrorRes } from "@/core/models/common";
import {
  CreateVrpType,
  I_GetCreateVrpListSuccessResponse,
} from "@/core/models/common/post_create_vrp";
import { fetchPostCreateVrp } from "@/core/services/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCreateVrp = () => {
  const mutations = useMutation<
    I_GetCreateVrpListSuccessResponse,
    I_GetErrorRes,
    CreateVrpType
  >({
    mutationKey: ["usePostCreateVrp"],
    mutationFn: (payload) => {
      return fetchPostCreateVrp(payload);
    },
    onError: (error) => {
      mutations.reset();
      toast.error(error.message);
    },
  });

  return mutations;
};
