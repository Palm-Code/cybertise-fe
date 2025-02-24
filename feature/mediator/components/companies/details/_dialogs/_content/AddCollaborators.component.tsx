import { ArrowLeft, ChevronLeft, MoveLeft, UserPlus, X } from "lucide-react";
import { Button, Loader, SearchInput, Typography } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import React, { useEffect, useRef, useState } from "react";
import { CollaboratorsTableView } from "@/feature/mediator/containers";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { useGetAddCollaboratorTableColumns } from "@/feature/mediator/constants/vrp-launchpad";
import { useTranslations } from "next-intl";
import {
  useGetHackerList,
  usePostAddCollaborators,
} from "@/feature/mediator/query/client";
import { useHackersParamsStore } from "@/feature/mediator/zustand/store/companies/hackers";
import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import { AddCollaboratorsTableView } from "@/feature/mediator/containers/companies/collaborators";
import { TableLoadingList } from "@/core/ui/container";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useInView } from "react-intersection-observer";
import { useClickSort, useOnchangeSearch, useSubmitSearch } from "@/core/hooks";
import { SkeletonList } from "@/core/ui/components/skeleton/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { hackerSortBy } from "@/core/constants/options";
import { useGetAssetType } from "@/core/react-query/client";
import { FilterDropdown } from "../../_dropdown";
import SortDropdown from "../../_dropdown/SortDropdown.component";
import { cn } from "@/core/lib/utils";
import { SuccessDialog } from "../SuccessDialog.component";
import { AlertDialog } from "../AlertDialog.component";

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
};

export const AddCollaborators = ({
  id,
  onClose = () => {},
  ...props
}: CollaboratorDialogProps) => {
  const queryClient = useQueryClient();
  const { data: assetType } = useGetAssetType();
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const addCollaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useHackersParamsStore();
  const [isPreview, setIsPreview] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const {
    queryMobile: {
      isLoading,
      isRefetching,
      data,
      fetchNextPage,
      isFetchingNextPage,
      refetch,
    },
  } = useGetHackerList(id, payload);
  const hackerListData = data?.pages.map((page) => page.data).flat();
  const [selectedCollaboratorsIds, setSelectedCollaboratorsIds] = useState<
    string[]
  >([]);
  const {
    mutateAsync: postAddCollaborators,
    isPending: isPendingPostAddCollaborators,
    isSuccess: isSuccessPostAddCollaborators,
  } = usePostAddCollaborators();

  const { ref: paginationRef, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [inView]);

  const tableData: I_GetCollaboratorSuccessResponse["data"] =
    hackerListData?.map((item) => {
      return {
        user: item,
      };
    }) || [];
  const selectedCollaboratorBulk = tableData?.filter((item) =>
    selectedCollaboratorsIds.includes(item.user.id)
  );

  const totalHackers = data?.pages[0].meta.total ?? 0;
  const currentShowHacker = hackerListData?.length ?? 0;

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

  const onClickInvite = (ids: string[]) => {
    postAddCollaborators({
      user_ids: ids,
      program_id: id,
    }).then((res) => {
      if (res) {
        queryClient.invalidateQueries({
          queryKey: ["getHackerList"],
        });
        setSelectedCollaboratorsIds([]);
      }
    });
  };

  if (isSuccessPostAddCollaborators) {
    return <SuccessDialog onClose={onClose} />;
  }

  if (isPreview) {
    return (
      <>
        <div
          className={cn(
            "h-full w-full rounded-2xl bg-background-main-light dark:bg-background-main-dark",
            "px-10 py-8"
          )}
        >
          <div className="relative flex h-full w-full flex-col gap-8">
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full items-center justify-between">
                <div className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <MoveLeft
                    className="cursor-pointer"
                    onClick={() => setIsPreview(false)}
                  />
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="h4"
                      weight="bold"
                    >
                      {t("title")}
                    </Typography>
                    <Typography
                      variant="p"
                      affects="normal"
                      className="text-neutral-light-40 dark:text-neutral-dark-40"
                    >
                      {t("description")}
                    </Typography>
                  </div>
                </div>
                <Button
                  variant="tertiary-mediator"
                  prefixIcon={<X />}
                  onClick={() =>
                    selectedCollaboratorsIds.length > 0
                      ? setIsOpenAlertDialog(true)
                      : onClose()
                  }
                >
                  {t("close")}
                </Button>
              </div>
            </div>
            <div className="relative h-full w-full space-y-6 overflow-auto">
              {isLoading || isRefetching ? (
                <TableLoadingList
                  stickyHeader
                  columns={addCollaboratorTableColums}
                />
              ) : totalHackers > 0 ? (
                <>
                  <AddCollaboratorsTableView
                    id={id}
                    selectedIds={selectedCollaboratorsIds}
                    columns={addCollaboratorTableColums}
                    data={selectedCollaboratorBulk ?? []}
                    isLoading={isPendingPostAddCollaborators}
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
                </>
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
            {selectedCollaboratorsIds.length > 0 && (
              <div
                className={cn("sticky bottom-4 z-50 mx-auto w-full", "px-6")}
              >
                <div
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-md px-6 py-3",
                    "bg-background-main-light shadow-toggle dark:bg-background-main-dark"
                  )}
                >
                  <Typography
                    variant="p"
                    affects="small"
                    weight="medium"
                  >
                    {selectedCollaboratorsIds.length} {t("hacker_selected")}
                  </Typography>
                  <Button
                    disabled={
                      selectedCollaboratorsIds.length === 0 ||
                      isPendingPostAddCollaborators
                    }
                    isLoading={isPendingPostAddCollaborators}
                    variant="primary-mediator"
                    onClick={() => {
                      onClickInvite(selectedCollaboratorsIds);
                    }}
                    postFixIcon={<UserPlus />}
                  >
                    {t("button_invite")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <AlertDialog
          isOpen={isOpenAlertDialog}
          onClose={onClose}
          onClickKeep={() => setIsOpenAlertDialog(false)}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "h-full w-full rounded-2xl bg-background-main-light dark:bg-background-main-dark",
          "px-10 py-8"
        )}
      >
        <div className="relative flex h-full w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <Typography
                  variant="h4"
                  weight="bold"
                >
                  {t("title")}
                </Typography>
              </div>
              <Button
                variant="tertiary-mediator"
                prefixIcon={<X />}
                onClick={() =>
                  selectedCollaboratorsIds.length > 0
                    ? setIsOpenAlertDialog(true)
                    : onClose()
                }
              >
                {t("close")}
              </Button>
            </div>
            <SearchInput
              id="search-hacker-collaborator"
              placeholder={t("search_add_collaborator")}
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
              variant="mediator"
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-6">
                <FilterDropdown
                  isModal
                  store={{ payload, setPayload }}
                  onValueChange={submitChange}
                />
              </div>
              <SortDropdown
                isModal
                variant="mediator"
                value={payload.params?.sort ?? "name"}
                options={hackerSortBy}
                onValueChange={(value) => {
                  useClickSort(value, { payload, setPayload });
                }}
              />
            </div>
          </div>
          <div className="relative h-full w-full space-y-6 overflow-auto">
            {isLoading || isRefetching ? (
              <TableLoadingList
                stickyHeader
                columns={addCollaboratorTableColums}
              />
            ) : totalHackers > 0 ? (
              <>
                <AddCollaboratorsTableView
                  id={id}
                  selectedIds={selectedCollaboratorsIds}
                  columns={addCollaboratorTableColums}
                  data={tableData ?? []}
                  isLoading={isPendingPostAddCollaborators}
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
                <div
                  ref={paginationRef}
                  className="w-full space-y-6"
                >
                  {isFetchingNextPage && (
                    <SkeletonList
                      className="h-16 w-full rounded-2xl"
                      count={3}
                    />
                  )}
                </div>
              </>
            ) : (
              <EmptyState
                noMargin
                type="collaborators"
                variant="mediator"
                titleText={t("no_hacker")}
                buttonText={""}
              />
            )}
            {selectedCollaboratorsIds.length > 0 && (
              <div
                className={cn("sticky bottom-4 z-50 mx-auto w-full", "px-6")}
              >
                <div
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-md px-6 py-3",
                    "bg-background-main-light shadow-toggle dark:bg-background-main-dark"
                  )}
                >
                  <Typography
                    variant="p"
                    affects="small"
                    weight="medium"
                  >
                    {selectedCollaboratorsIds.length} {t("hacker_selected")}
                  </Typography>
                  <Button
                    disabled={
                      selectedCollaboratorsIds.length === 0 ||
                      isPendingPostAddCollaborators
                    }
                    isLoading={isPendingPostAddCollaborators}
                    variant="ghost-mediator"
                    onClick={() => {
                      setIsPreview(true);
                    }}
                    prefixIcon={<UserPlus />}
                  >
                    {t("button_invite")}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Typography
            variant="p"
            affects="tiny"
            className="italic text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {t("showing_hacker", {
              currentShowHacker,
              totalHackers,
            })}
          </Typography>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpenAlertDialog}
        onClose={onClose}
        onClickKeep={() => setIsOpenAlertDialog(false)}
      />
    </>
  );
};
