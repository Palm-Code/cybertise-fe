import { ChevronLeft, X } from "lucide-react";
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

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
  onClickBack: () => void;
};

export const AddCollaborators = ({
  id,
  onClickBack,
  ...props
}: CollaboratorDialogProps) => {
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

  const onClickInvite = (ids: string[]) => {
    postAddCollaborators({
      user_ids: ids,
      program_id: id,
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
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <ChevronLeft
              className="size-8 cursor-pointer"
              onClick={onClickBack}
            />
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
          buttonVariant="tertiary"
        />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <BaseDropdown
              contentClassName="z-[99999]"
              label="Filter by"
              value="all"
              options={[]}
              onValueChange={() => {}}
            />
            <BaseDropdown
              contentClassName="z-[99999]"
              variant="mediator"
              label="Sort by"
              value={payload?.params?.sort}
              options={[
                {
                  label: "Valid Reports",
                  value: "-valid_report",
                },
              ]}
              onValueChange={(v) => {
                useClickSort(v, { payload, setPayload });
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <Typography variant="p" affects="normal" weight="semibold">
              {selectedCollaboratorsIds.length} {t("hacker_selected")}
            </Typography>
            <Button
              disabled={
                selectedCollaboratorsIds.length === 0 ||
                isPendingPostAddCollaborators
              }
              isLoading={isPendingPostAddCollaborators}
              variant="ghost-mediator"
              size="lg"
              className="font-semibold"
              onClick={() => {
                onClickInvite(selectedCollaboratorsIds);
              }}
            >
              {t("button_invite")}
            </Button>
          </div>
        </div>
        <Typography variant="p" affects="normal" weight="semibold">
          {t("showing_hacker", {
            currentShowHacker,
            totalHackers,
          })}
        </Typography>
      </div>
      <div className="h-full w-full space-y-6 overflow-auto">
        {isLoading || isRefetching ? (
          <TableLoadingList stickyHeader columns={addCollaboratorTableColums} />
        ) : totalHackers > 0 ? (
          <>
            <AddCollaboratorsTableView
              columns={addCollaboratorTableColums}
              data={tableData ?? []}
              isLoading={isPendingPostAddCollaborators}
              onClickInvite={(ids) => {
                onClickInvite(ids);
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
            titleText={t("no_hacker")}
            buttonText={""}
          />
        )}
      </div>
    </div>
  );
};
