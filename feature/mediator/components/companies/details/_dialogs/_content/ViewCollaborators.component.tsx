import { Plus, X } from "lucide-react";
import { Button, SearchInput, Typography } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import React, { useEffect, useState } from "react";
import { CollaboratorsTableView } from "@/feature/mediator/containers";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { useGetAddCollaboratorTableColumns } from "@/feature/mediator/constants/vrp-launchpad";
import { useCollaboratorsParamsStore } from "@/feature/mediator/zustand/store/companies/collaborators";
import {
  useDeleteCollaborators,
  useGetCollaboratorList,
} from "@/feature/mediator/query/client";
import { TableLoadingList } from "@/core/ui/container";
import { useTranslations } from "next-intl";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useInView } from "react-intersection-observer";
import { useOnchangeSearch, useSubmitSearch } from "@/core/hooks";
import { SkeletonList } from "@/core/ui/components/skeleton/skeleton";

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
  const collaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useCollaboratorsParamsStore();

  const {
    queryMobile: {
      isLoading,
      isRefetching,
      data: collaboratorList,
      fetchNextPage,
      isFetchingNextPage,
      refetch,
    },
  } = useGetCollaboratorList(payload, id);
  const {
    mutateAsync: deleteCollaborator,
    isPending: isPendingDeleteCollaborators,
  } = useDeleteCollaborators();

  const collaboratorListData = collaboratorList?.pages
    .map((page) => page.data)
    .flat();
  const [selectedCollaboratorsIds, setSelectedCollaboratorsIds] = useState<
    string[]
  >([]);

  const totalCollaborator = collaboratorList?.pages[0].meta.total ?? 0;
  const currentShowCollaborator = collaboratorListData?.length ?? 0;
  const { ref: paginationRef, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [inView]);

  const onClickDeleteCollaborators = (ids: string[]) => {
    deleteCollaborator({
      collaborator_ids: ids,
    }).then((res) => {
      if (res) {
        setSelectedCollaboratorsIds([]);
      }
    });
  };

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
        <SearchInput
          placeholder={t("search_placeholder")}
          variant="mediator"
          value={payload?.params?.search}
          onChange={(e) =>
            useOnchangeSearch(e.target.value, { payload, setPayload }, refetch)
          }
          loadingSubmit={isLoading && isRefetching}
          onSubmitSearch={() =>
            useSubmitSearch(payload.params?.search, refetch)
          }
          buttonVariant="tertiary"
        />
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
              {selectedCollaboratorsIds.length} {t("hacker_selected")}
            </Typography>
            <Button
              disabled={
                selectedCollaboratorsIds.length === 0 ||
                isPendingDeleteCollaborators
              }
              isLoading={isPendingDeleteCollaborators}
              variant="ghost-alert"
              size="lg"
              className="font-semibold"
              onClick={() => {
                onClickDeleteCollaborators(selectedCollaboratorsIds);
              }}
            >
              {t("button_delete")}
            </Button>
          </div>
        </div>
        <Typography variant="p" affects="normal" weight="semibold">
          {t("showing_collaborator", {
            currentShowCollaborator,
            totalCollaborator,
          })}
        </Typography>
      </div>
      <div className="h-full w-full space-y-6 overflow-auto">
        {isLoading || isRefetching ? (
          <TableLoadingList stickyHeader columns={collaboratorTableColums} />
        ) : totalCollaborator > 0 ? (
          <>
            <CollaboratorsTableView
              isLoading={isLoading || isRefetching}
              columns={collaboratorTableColums}
              data={collaboratorListData ?? []}
              onClickDeleteCollaborator={(ids) => {
                onClickDeleteCollaborators(ids);
              }}
              onChangeCheckbox={(id, checked) => {
                if (checked) {
                  setSelectedCollaboratorsIds((prev) => [...prev, id]);
                } else {
                  setSelectedCollaboratorsIds((prev) =>
                    prev.filter((item) => item !== id)
                  );
                }
              }}
            />
            <div ref={paginationRef} className="w-full space-y-6">
              {isFetchingNextPage && (
                <SkeletonList className="h-16 w-full rounded-2xl" count={3} />
              )}
            </div>
          </>
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
