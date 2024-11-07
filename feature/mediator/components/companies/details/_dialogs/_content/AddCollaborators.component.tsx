import { ChevronLeft, UserPlus, X } from "lucide-react";
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
import {
  collaboratorSortBy,
  hackerSortBy,
  ticketReportedOptions,
} from "@/core/constants/options";
import { useGetAssetType } from "@/core/react-query/client";
import { FilterDropdown } from "../../_dropdown";
import SortByDropdown from "../../../_dropdown/SortBy.component";
import SortDropdown from "../../_dropdown/SortDropdown.component";
import { cn } from "@/core/lib/utils";

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
};

export const AddCollaborators = ({ id, ...props }: CollaboratorDialogProps) => {
  const queryClient = useQueryClient();
  const { data: assetType } = useGetAssetType();
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  const addCollaboratorTableColums = useGetAddCollaboratorTableColumns();
  const { payload, setPayload } = useHackersParamsStore();
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
  const selectedCollaboratorBulk = hackerListData?.filter((item) =>
    selectedCollaboratorsIds.includes(item.id)
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

  return (
    <div className="relative flex h-full w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <Typography variant="h4" weight="bold">
              {t("title")}
            </Typography>
          </div>
          <Button
            variant="tertiary-mediator"
            prefixIcon={<X />}
            onClick={props.onClose}
          >
            {t("close")}
          </Button>
        </div>
        <SearchInput
          id="search-hacker-collaborator"
          placeholder={t("search_add_collaborator")}
          value={payload?.params?.search}
          onChange={(e) =>
            useOnchangeSearch(e.target.value, { payload, setPayload }, refetch)
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
          <TableLoadingList stickyHeader columns={addCollaboratorTableColums} />
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
            titleText={t("no_hacker")}
            buttonText={""}
          />
        )}
        {selectedCollaboratorsIds.length > 0 && (
          <div className={cn("sticky bottom-4 z-50 mx-auto w-full", "px-6")}>
            <div
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-md px-6 py-3",
                "bg-background-main-light shadow-toggle dark:bg-background-main-dark"
              )}
            >
              <Typography variant="p" affects="small" weight="medium">
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
                  onClickInvite(selectedCollaboratorsIds);
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
  );
};
