"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
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
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";
import {
  ReportsCardView,
  ReportsGridView,
  ReportsTableView,
} from "../../containers";
import { tableColumns } from "../../constants/reports";
import { Desktop, Mobile } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";
import { useGetChatList } from "../../query/client";
import { useReportListStore } from "@/feature/company/zustand/store/reports";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Reports = () => {
  const store = useReportListStore();
  const { payload, setPayload } = store;
  const {
    queryDesktop: {
      data: reportsData,
      isLoading,
      isFetching,
      refetch,
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
  } = useGetChatList(payload);
  const mobileReportsData = data?.pages.map((page) => page.data).flat();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <ReportsTableView
        columns={tableColumns}
        data={reportsData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    card: (
      <ReportsCardView
        data={reportsData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: (
      <ReportsGridView
        data={reportsData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!reportsData) return <Loader variant="company" />;

  const submitChange = (type: string, value: string) => {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        filter: {
          ...payload.params?.filter,
          [type]: value === "all" ? undefined : value,
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
                Reports
              </Typography>
              <SearchInput
                isMobile
                id="search-reports-company"
                value={payload?.params?.search}
                variant="company"
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
              <DashboardFilter variant="company" store={store} />
              <div className="inline-flex min-w-32 gap-4">
                <FilterDropdown
                  variant="company"
                  value={payload?.params?.sort!}
                  options={filterItems}
                  onValueChange={(v) => useClickSort(v, store)}
                />
              </div>
            </div>
          </div>
          {mobileReportsData?.length! ? (
            <>
              <ReportsGridView
                data={mobileReportsData}
                isLoading={mobileIsLoading || mobileIsFetching}
              />
              <div ref={ref} className="w-full space-y-6">
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="company"
              type="ticket"
              buttonText="See my Programs"
              href="/vrp-launchpad"
            />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pb-28 pt-12">
          <div className="grid w-full grid-cols-2 place-items-center content-between">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Reports
            </Typography>
            <div className="ml-auto w-full max-w-xl">
              <SearchInput
                id="search-reports-company"
                variant="company"
                placeholder="Try “#21231” or “Company name”"
                value={payload?.params?.search}
                onChange={(e) =>
                  useOnchangeSearch(e.target.value, store, refetch)
                }
                loadingSubmit={isLoading && isRefetching}
                onSubmitSearch={() =>
                  useSubmitSearch(payload.params?.search, refetch)
                }
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <DashboardFilter
              variant="company"
              store={store}
              onValueChange={(v, t) => submitChange(t, v)}
            />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="company"
                value={payload?.params?.sort as string}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
              <FilterViewDropdown type="company" options={filterView} />
            </div>
          </div>
          {reportsData?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="company"
                active={payload.params?.page?.size}
                meta={reportsData?.meta}
                activePage={payload.params?.page?.number}
                onClickNext={() =>
                  useClickPaginate(payload.params?.page?.number! + 1, store)
                }
                onClickPrevious={() =>
                  useClickPaginate(payload.params?.page?.number! - 1, store)
                }
                setActivePage={(v) => useClickPaginate(v, store)}
                onClickShow={(v) => {
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      page: {
                        ...payload.params?.page!,
                        size: v,
                      },
                    },
                  });
                }}
              />
            </>
          ) : (
            <EmptyState
              variant="company"
              type="ticket"
              buttonText="See my Programs"
              href="/vrp-launchpad"
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default Reports;
