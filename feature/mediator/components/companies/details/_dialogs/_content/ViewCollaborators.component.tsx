"use client";
import { MoveLeft, UserPlus, Users, X } from "lucide-react";
import { Button, Card, SearchInput, Typography } from "@/core/ui/components";
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
import { useClickSort, useOnchangeSearch, useSubmitSearch } from "@/core/hooks";
import { SkeletonList } from "@/core/ui/components/skeleton/skeleton";
import { cn } from "@/core/lib/utils";
import { useRouter } from "next/navigation";
import { CollaboratorDialog } from "../CollaboratorDialog.component";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProgramDetails } from "@/feature/mediator/query/client/useGetProgramDetails";
import { collaboratorSortBy } from "@/core/constants/options";
import { useGetAssetType } from "@/core/react-query/client";
import { FilterDropdown } from "../../_dropdown";
import SortDropdown from "../../_dropdown/SortDropdown.component";

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
  const { data: assetType } = useGetAssetType();
  const router = useRouter();
  const collaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useCollaboratorsParamsStore();
  const [showModalAddCollaborator, setShowModalAddCollaborator] =
    useState(false);

  const { data, isLoading: isLoadingProgramDetails } = useGetProgramDetails(
    undefined,
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

  const submitChange = (
    type: "valid_report_size" | "has_asset_type",
    value: string
  ) => {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        filter: {
          ...payload.params?.filter,
          [type]:
            value === "all"
              ? undefined
              : type === "valid_report_size"
                ? value
                : assetType?.find((v) => v.value === value)?.id,
        },
      },
    });
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col gap-6 pt-12">
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
            "flex w-full flex-col gap-6 rounded-t-2xl px-12 py-8",
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
            <FilterDropdown
              store={{ payload, setPayload }}
              onValueChange={submitChange}
            />
            <SortDropdown
              variant="mediator"
              value={payload.params?.sort ?? "name"}
              options={collaboratorSortBy}
              onValueChange={(value) => {
                useClickSort(value, { payload, setPayload });
              }}
            />
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
              onClickButton={() => setShowModalAddCollaborator(true)}
            />
          )}
        </div>
        {selectedCollaboratorsIds.length > 0 && (
          <div
            className={cn(
              "fixed bottom-4 right-12 z-50 mx-auto max-w-[calc(100vw-(272px+104px))]",
              "flex w-full items-center justify-center gap-4 rounded-md",
              "px-6 py-3",
              "bg-background-main-light shadow-toggle dark:bg-background-main-dark"
            )}
          >
            <div className="flex w-full items-center justify-between">
              <Typography variant="p" affects="small" weight="medium">
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
                onClick={() => {
                  onClickDeleteCollaborators(selectedCollaboratorsIds);
                }}
                prefixIcon={<X />}
              >
                {t("button_delete")}
              </Button>
            </div>
          </div>
        )}
      </div>
      <CollaboratorDialog
        id={id}
        isOpen={showModalAddCollaborator}
        onClose={() => setShowModalAddCollaborator(false)}
      />
    </>
  );
};
