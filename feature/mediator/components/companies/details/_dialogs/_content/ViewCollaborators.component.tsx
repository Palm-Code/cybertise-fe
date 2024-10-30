import { Plus, X } from "lucide-react";
import { Button, SearchInput, Typography } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import React from "react";
import { CollaboratorsTableView } from "@/feature/mediator/containers";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { useGetCollaboratorTableColumns } from "@/feature/mediator/constants/vrp-launchpad";
import { useCollaboratorsParamsStore } from "@/feature/mediator/zustand/store/companies/collaborators";
import { useGetCollaboratorList } from "@/feature/mediator/query/client";
import { TableLoadingList } from "@/core/ui/container";
import { useTranslations } from "next-intl";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

type CollaboratorDialogProps = I_ModalProps & {
  onClickAddCollaborator: () => void;
  id: string;
};

export const ViewCollaborators = ({
  onClickAddCollaborator,
  id,
  ...props
}: CollaboratorDialogProps) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const collaboratorTableColums = useGetCollaboratorTableColumns();
  const { payload, setPayload } = useCollaboratorsParamsStore();

  const {
    queryMobile: { isLoading, isRefetching, data: collaboratorList },
  } = useGetCollaboratorList(payload, id);

  const collaboratorListData = collaboratorList?.pages
    .map((page) => page.data)
    .flat();

  const totalCollaborator = collaboratorList?.pages[0].meta.total ?? 0;

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <Typography variant="h4" weight="bold">
            VRP Title 1
          </Typography>
          <Button
            variant="tertiary-mediator"
            prefixIcon={<X />}
            onClick={props.onClose}
          >
            {t("close")}
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <Typography variant="h5" weight="bold">
            {totalCollaborator} {t("hacker_invited")}
          </Typography>
          <Button
            variant="primary-mediator"
            prefixIcon={<Plus />}
            onClick={onClickAddCollaborator}
          >
            {t("button_add_collaborator")}
          </Button>
        </div>
        <SearchInput placeholder={t("search_placeholder")} variant="mediator" />
        <div className="flex w-full items-center justify-between">
          <BaseDropdown
            label="Filter by"
            value="all"
            options={[]}
            onValueChange={() => {}}
          />
          <BaseDropdown
            label="Sort by"
            value="all"
            options={[]}
            onValueChange={() => {}}
          />
        </div>
      </div>
      <div className="h-full w-full overflow-auto">
        {isLoading || isRefetching ? (
          <TableLoadingList stickyHeader columns={collaboratorTableColums} />
        ) : totalCollaborator > 0 ? (
          <CollaboratorsTableView
            columns={collaboratorTableColums}
            data={collaboratorListData ?? []}
          />
        ) : (
          <EmptyState
            noMargin
            type="collaborators"
            variant="mediator"
            titleText={t("no_collaborators")}
            buttonText={t("button_add_collaborator")}
            onClickButton={onClickAddCollaborator}
          />
        )}
      </div>
    </div>
  );
};
