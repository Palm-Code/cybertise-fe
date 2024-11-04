import { fetchPostAddCollaborators } from "@/core/services/mediator/collaborators";

import { I_GetErrorRes } from "@/core/models/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostAddCollaborators = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    any,
    I_GetErrorRes,
    {
      user_ids: string[];
      program_id: string;
    }
  >({
    retry: 3,
    mutationFn: fetchPostAddCollaborators,
    onSuccess(_, variables) {
      // mutation.reset();
      queryClient.invalidateQueries({
        queryKey: ["getCollaboratorList"],
      });
      toast.success(
        `Successfully added ${variables.user_ids.length} collaborators`,
        {
          position: "bottom-right",
          action: {
            label: "Close",
            onClick: () => {
              toast.dismiss();
            },
          },
          duration: 3000,
        }
      );
    },
    onError(error, variables) {
      mutation.reset();
      toast.error(error.message, {
        position: "bottom-right",
        action: {
          label: "retry",
          onClick: () => {
            mutation.mutate(variables);
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

  return mutation;
};
