import { I_GetErrorRes } from "@/core/models/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchDeleteCollaborators } from "@/core/services/mediator/collaborators/fetchDeleteCollaborators";

export const useDeleteCollaborators = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    any,
    I_GetErrorRes,
    {
      collaborator_ids: string[];
    }
  >({
    retry: 3,
    mutationFn: fetchDeleteCollaborators,
    onSuccess(_, variables) {
      toast.success(
        `Successfully deleted ${variables.collaborator_ids.length} collaborators`,
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
