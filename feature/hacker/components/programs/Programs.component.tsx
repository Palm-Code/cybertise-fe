"use client";
import {
  filterItems,
  filterSortBy,
  filterView,
} from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  Loader,
  Pagination,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import {
  ProgramsCardView,
  ProgramsGridView,
  ProgramsTableView,
} from "../../containers";
import { useGetTableColumns } from "../../constants/programs";
import ProgramsFilterDropdown from "./_dropdown/ProgramFilter.component";
import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useGetProgramList } from "../../query/client/useGetProgramList";
import { useProgramListParamStore } from "../../zustand/store/programs";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface I_ProgramsProps {
  assetTypes: I_GetAssetTypeSuccessResponse["data"];
}

const Dashboard = ({ assetTypes }: I_ProgramsProps) => {
  const t = useTranslations("ProgramsHacker");
  const store = useProgramListParamStore();
  const tableColumns = useGetTableColumns();
  const { payload, setPayload } = store;
  const {
    queryDesktop: {
      data: programList,
      isLoading,
      isFetching,
      refetch: refetchProgramList,
      isRefetching,
    },
    queryMobile: {
      data,
      isLoading: mobileIsLoading,
      refetch: mobileRefetch,
      isFetching: mobileIsFetching,
      isFetchingNextPage,
      fetchNextPage,
    },
  } = useGetProgramList(payload);
  const mobileProgramListData = data?.pages.map((page) => page.data).flat();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <ProgramsTableView
        isLoading={isLoading || isFetching}
        columns={tableColumns}
        data={programList?.data}
      />
    ),
    card: (
      <ProgramsCardView
        isLoading={isLoading || isFetching}
        data={programList?.data}
      />
    ),
    grid: (
      <ProgramsGridView
        isLoading={isLoading || isFetching}
        data={programList?.data}
      />
    ),
  };

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [inView]);

  if (!programList) return <Loader variant="hacker" />;

  const submitChange = (type: "type" | "has_asset_type", value: string) => {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        filter: {
          ...payload.params?.filter,
          [type]:
            value === "all"
              ? undefined
              : type === "type"
                ? value
                : assetTypes?.find((v) => v.value === value)?.id,
        },
      },
    });
  };

  return (
    <>
      <Mobile>
        <div
          className={cn(
            "_flexbox__col__start__start min-h-full w-full gap-10 pt-8",
            "px-6 pb-8"
          )}
        >
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <div className="_flexbox__row__center__between w-full">
              <Typography variant="h4" weight="bold" className="mr-auto">
                {t("title")}
              </Typography>
              <SearchInput
                isMobile
                id="program-search-hacker"
                value={payload?.params?.search}
                variant="hacker"
                placeholder="Search for programs"
                onChange={(e) =>
                  useOnchangeSearch(e.target.value, store, mobileRefetch)
                }
                onSubmitSearch={() =>
                  useSubmitSearch(payload.params?.search, mobileRefetch)
                }
              />
            </div>
            <div className="flex w-full items-center justify-between gap-4 sm:justify-start">
              <ProgramsFilterDropdown
                variant="hacker"
                store={store}
                assetTypeOptions={assetTypes}
                onValueChange={(v, t) => submitChange(t, v)}
              />
              <div className="inline-flex min-w-32 gap-4">
                <FilterDropdown
                  variant="hacker"
                  value={payload.params?.sort}
                  options={filterSortBy.timestamp}
                  onValueChange={(v) => useClickSort(v, store)}
                />
              </div>
            </div>
          </div>
          {!data && <ChatListCardLoadingList isGridCard />}
          {mobileProgramListData && mobileProgramListData.length! ? (
            <>
              <ProgramsGridView
                isLoading={mobileIsLoading || mobileIsFetching}
                data={mobileProgramListData}
              />
              <div ref={ref} className="w-full space-y-6">
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="hacker"
              type="ticket"
              buttonText={t("see_programs")}
            />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pt-12">
          <div className="grid w-full grid-cols-2 place-items-center content-between">
            <Typography variant="h4" weight="bold" className="mr-auto">
              {t("title")}
            </Typography>
          </div>
          <div
            className={cn(
              "_flexbox__col__start__start w-full gap-6 rounded-2xl",
              "bg-background-main-light px-12 py-8 dark:bg-background-main-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              {t("search_title")}
            </Typography>
            <SearchInput
              id="program-search-hacker"
              variant="hacker"
              placeholder={t("placeholder_search")}
              value={payload.params?.search}
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetchProgramList)
              }
              loadingSubmit={isLoading || isRefetching}
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchProgramList)
              }
            />
            <ProgramsFilterDropdown
              store={store}
              assetTypeOptions={assetTypes}
              onValueChange={(v, t) => submitChange(t, v)}
            />
          </div>
          <div className="_flexbox__row__center__between w-full">
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="hacker"
                value={payload?.params?.sort as string}
                options={filterSortBy.timestamp}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown type="hacker" options={filterView} />
            </div>
          </div>
          {programList && programList.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="hacker"
                active={payload.params?.page?.size}
                meta={programList?.meta}
                activePage={payload.params?.page?.number}
                onClickPrevious={() =>
                  useClickPaginate(payload?.params?.page?.number! - 1, store)
                }
                onClickNext={() =>
                  useClickPaginate(payload?.params?.page?.number! + 1, store)
                }
                setActivePage={(v) => useClickPaginate(v, store)}
                onClickShow={(v) =>
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      page: { ...payload.params?.page!, size: v },
                    },
                  })
                }
              />
            </>
          ) : (
            <EmptyState
              variant="hacker"
              type="ticket"
              buttonText={t("see_programs")}
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default Dashboard;
