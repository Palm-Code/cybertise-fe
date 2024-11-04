"use client";
import {
  MoveLeft,
  Plus,
  UserMinus,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import { Button, Card, SearchInput, Typography } from "@/core/ui/components";
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
import { cn } from "@/core/lib/utils";
import { useRouter } from "next/navigation";
import { CollaboratorDialog } from "../CollaboratorDialog.component";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProgramDetails } from "@/feature/mediator/query/client/useGetProgramDetails";

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
  const router = useRouter();
  const collaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useCollaboratorsParamsStore();
  const [showModalAddCollaborator, setShowModalAddCollaborator] =
    useState(false);

  const { data, isLoading: isLoadingProgramDetails } = useGetProgramDetails(
    payload,
    id
  );

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
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({
          queryKey: ["getCollaboratorList"],
        });
        setSelectedCollaboratorsIds([]);
      }
    });
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-6 pt-12">
        <Card
          className={cn(
            "grid grid-cols-[auto_1fr] items-center gap-6",
            "rounded-b-none rounded-t-2xl xl:px-8 xl:py-6"
          )}
        >
          <MoveLeft onClick={router.back} className="cursor-pointer" />
          {isLoadingProgramDetails ? (
            <SkeletonList className="h-8 w-48" count={1} />
          ) : (
            <Typography variant="h5" weight="bold">
              {data?.data.title} - {t("titles")}
            </Typography>
          )}
        </Card>
        <div
          className={cn(
            "flex w-full flex-col gap-6 rounded-2xl px-12 py-8",
            "bg-background-main-light dark:bg-background-main-dark"
          )}
        >
          <div className={cn("flex w-full items-center justify-between")}>
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <Users />
              <Typography variant="p" affects="large" weight="semibold">
                {totalCollaborator} {t("hacker_invited")}
              </Typography>
            </div>
            <Button
              variant="tertiary-mediator"
              prefixIcon={<UserPlus />}
              onClick={() => setShowModalAddCollaborator(true)}
            >
              {t("button_add_collaborator")}
            </Button>
          </div>
          <SearchInput
            placeholder={t("search_placeholder")}
            variant="mediator"
            value={payload?.params?.search}
            onChange={(e) =>
              useOnchangeSearch(
                e.target.value,
                { payload, setPayload },
                refetch
              )
            }
            loadingSubmit={isLoading && isRefetching}
            onSubmitSearch={() =>
              useSubmitSearch(payload.params?.search, refetch)
            }
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
                prefixIcon={<UserX className="h-4 w-4" />}
              >
                {t("button_delete")}
              </Button>
            </div>
          </div>
        </div>
        <div className="h-full w-full space-y-6">
          {isLoading || isRefetching ? (
            <TableLoadingList stickyHeader columns={collaboratorTableColums} />
          ) : totalCollaborator > 0 ? (
            <>
              <CollaboratorsTableView
                selectedIds={selectedCollaboratorsIds}
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
              <div ref={paginationRef} className="w-full space-y-6 pb-28">
                {isFetchingNextPage && (
                  <SkeletonList className="h-16 w-full rounded-2xl" count={3} />
                )}
                <Typography
                  variant="p"
                  affects="tiny"
                  className="italic text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("showing_collaborator", {
                    currentShowCollaborator,
                    totalCollaborator,
                  })}
                </Typography>
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
      <CollaboratorDialog
        id={id}
        isOpen={showModalAddCollaborator}
        onClose={() => setShowModalAddCollaborator(false)}
      />
    </>
  );
};
