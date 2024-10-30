import { X } from "lucide-react";
import { Button, SearchInput, Typography } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import React from "react";
import { CollaboratorsTableView } from "@/feature/mediator/containers";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { useGetAddCollaboratorTableColumns } from "@/feature/mediator/constants/vrp-launchpad";
import { useTranslations } from "next-intl";
import { useGetHackerList } from "@/feature/mediator/query/client";
import { useHackersParamsStore } from "@/feature/mediator/zustand/store/companies/hackers";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import { AddCollaboratorsTableView } from "@/feature/mediator/containers/companies/collaborators";
import { TableLoadingList } from "@/core/ui/container";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
};

export const AddCollaborators = ({ id, ...props }: CollaboratorDialogProps) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const addCollaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useHackersParamsStore();
  const {
    queryMobile: { isLoading, isRefetching, data },
  } = useGetHackerList(id, payload);

  const hackerListData = data?.pages.map((page) => page.data).flat();
  const tableData: I_GetCollaboratorSuccessResponse["data"] =
    hackerListData?.map((item) => {
      return {
        user: item,
      };
    }) || [];

  const totalHackers = data?.pages[0].meta.total ?? 0;

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <Typography variant="h4" weight="bold">
            {t("title")}
          </Typography>
          <Button
            variant="tertiary-mediator"
            prefixIcon={<X />}
            onClick={props.onClose}
          >
            {t("close")}
          </Button>
        </div>
        <SearchInput placeholder="Search hacker" variant="mediator" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
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
          <div className="flex items-center gap-4">
            <Typography variant="p" affects="normal" weight="semibold">
              {t("hacker_selected")}
            </Typography>
            <Button
              variant="ghost-mediator"
              size="lg"
              className="font-semibold"
            >
              {t("button_invite")}
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full w-full overflow-auto">
        {isLoading || isRefetching ? (
          <TableLoadingList stickyHeader columns={addCollaboratorTableColums} />
        ) : totalHackers > 0 ? (
          <AddCollaboratorsTableView
            columns={addCollaboratorTableColums}
            data={tableData ?? []}
            onClickInvite={(ids) => {
              alert(ids.join(","));
            }}
          />
        ) : (
          <EmptyState
            noMargin
            type="collaborators"
            variant="mediator"
            titleText={t("no_hacker")}
            buttonText={""}
          />
        )}
      </div>
    </div>
  );
};
