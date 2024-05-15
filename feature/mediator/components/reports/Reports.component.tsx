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
import { useReportListStore } from "../../zustand/store/reports";
import { useGetChatList } from "../../query/client";
import useLoadMore from "@/core/hooks/useLoadMore";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";

const Reports = () => {
  const store = useReportListStore();
  const { payload, setPayload } = store;
  const {
    data: reportsData,
    isLoading,
    isFetching,
    refetch,
    isRefetching,
  } = useGetChatList(payload);
  const pageNumbers = reportsData?.meta?.last_page || 1;
  const { ref } = useLoadMore(store, pageNumbers);
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

  if (!reportsData) return <Loader variant="mediator" />;

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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 px-6 py-8">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Reports
            </Typography>
            <SearchInput
              value={payload?.params?.search}
              variant="mediator"
              placeholder="Search for programs"
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetch)
              }
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetch)
              }
            />
          </div>
          <div className="_flexbox__row__center__between w-full">
            <DashboardFilter variant="mediator" store={store} />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort!}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
          </div>
          {reportsData?.data.length! ? (
            <>
              <ReportsGridView
                data={reportsData?.data}
                isLoading={isLoading || isFetching}
              />
              <div ref={ref} className="w-full">
                {isFetching && !isRefetching ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="mediator"
              type="ticket"
              buttonText="See VRP Launchpad"
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
                value={payload?.params?.search}
                variant="mediator"
                placeholder="Search for programs"
                onChange={(e) =>
                  useOnchangeSearch(e.target.value, store, refetch)
                }
                onSubmitSearch={() =>
                  useSubmitSearch(payload.params?.search, refetch)
                }
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter
              variant="mediator"
              store={store}
              onValueChange={(v, t) => submitChange(t, v)}
            />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort!}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
              <FilterViewDropdown type="mediator" options={filterView} />
            </div>
          </div>
          {reportsData?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
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
              variant="mediator"
              type="ticket"
              buttonText="See VRP Launchpad"
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default Reports;
