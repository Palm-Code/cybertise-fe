"use client";
import { Delete, EllipsisVertical, UserMinus, UserX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Desktop } from "@/core/ui/layout";
import { Button } from "@/core/ui/components";
import { useTranslations } from "next-intl";
import { useDeleteCollaborators } from "@/feature/mediator/query/client/useDeleteCollaborators";

interface I_ActionDropDownProps {
  withIcon?: boolean;
  companyTicketId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: (id: string) => void;
}

const ActionDropDown = ({
  withIcon,
  companyTicketId,
  open = false,
  onSuccess = () => {},
  onOpenChange = () => {},
  ...props
}: I_ActionDropDownProps) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const {
    mutateAsync: deleteCollaborator,
    isPending: isPendingDeleteCollaborators,
    isSuccess: isSuccessDeleteCollaborators,
  } = useDeleteCollaborators();

  const onClickDeleteCollaborators = (ids: string[]) => {
    deleteCollaborator({
      collaborator_ids: ids,
    }).then((res) => {
      if (res) {
        onSuccess(companyTicketId);
      }
    });
  };

  return (
    <>
      <Desktop className="mx-auto w-fit">
        <Select open={open} onOpenChange={onOpenChange}>
          <SelectTrigger className="!bg-transparent !p-0">
            <Button variant="tertiary-mediator" size="ghost">
              <EllipsisVertical />
            </Button>
          </SelectTrigger>
          <SelectContent
            align="center"
            alignOffset={10}
            sideOffset={10}
            className="!bg-white dark:!bg-neutral-dark-100"
          >
            <Button
              variant="tertirary-alert"
              disabled={
                isPendingDeleteCollaborators || isSuccessDeleteCollaborators
              }
              isLoading={isPendingDeleteCollaborators}
              prefixIcon={<UserX className="h-4 w-4" />}
              onClick={() => {
                onClickDeleteCollaborators([companyTicketId]);
              }}
            >
              {t("button_delete")}
            </Button>
          </SelectContent>
        </Select>
      </Desktop>
    </>
  );
};
export default ActionDropDown;
