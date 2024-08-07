"use client";
import { I_GetErrorRes } from "@/core/models/common";
import {
  CreateVrpType,
  I_GetCreateVrpListSuccessResponse,
} from "@/core/models/common/post_create_vrp";
import { fetchPostUpdateVrp } from "@/core/services/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostUpdateVrp = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutations = useMutation<
    I_GetCreateVrpListSuccessResponse,
    I_GetErrorRes,
    CreateVrpType
  >({
    mutationKey: ["usePostUpdateVrp"],
    mutationFn: (payload) => {
      return fetchPostUpdateVrp(payload, id);
    },
    onSuccess: (data) => {
      mutations.reset();
      toast.success("successfully updated VRP", {
        position: "bottom-right",
        duration: 3000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getProgramListDetails"],
      });
      router.push("/vrp-launchpad");
    },
    onError: (error) => {
      mutations.reset();
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutations;
};
