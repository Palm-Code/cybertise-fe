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
import { tableColumns } from "../../constants/dashboard";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import { I_TableTicketData } from "@/interfaces";
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";
import {
  DashboardCardView,
  DashboardGridView,
  DashboardTableView,
} from "../../containers";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useChatListParamStore } from "../../zustand/store/dashboard";
import { useGetChatList } from "../../query/client";
import useLoadMore from "@/core/hooks/useLoadMore";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";

const Dashboard = () => {
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const {
    data: dashboardData,
    isLoading,
    isFetching,
    refetch,
    isRefetching,
  } = useGetChatList(payload);
  const pageNumbers = dashboardData?.meta?.last_page || 1;
  const { ref } = useLoadMore(store, pageNumbers);
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <DashboardTableView
        columns={tableColumns}
        data={dashboardData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    card: (
      <DashboardCardView
        data={dashboardData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: (
      <DashboardGridView
        data={dashboardData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
  };

  if (!dashboardData) return <Loader variant="mediator" />;

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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Open Ticket
            </Typography>
            <SearchInput
              value={payload?.params?.search}
              variant="mediator"
              placeholder="Try “#21231” or “Company name”"
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetch)
              }
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetch)
              }
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter variant="mediator" />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value="Sort By"
                options={filterItems}
                onValueChange={() => {}}
              />
            </div>
          </div>
          {dashboardData?.data.length! ? (
            <>
              <DashboardGridView
                data={dashboardData?.data}
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10">
          <div className="grid w-full grid-cols-2 place-items-center content-between">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Open Ticket
            </Typography>
            <div className="ml-auto w-full max-w-xl">
              <SearchInput
                variant="mediator"
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
          <div className="flex w-full items-center justify-between">
            <DashboardFilter
              variant="mediator"
              onValueChange={(v, t) => submitChange(t, v)}
              store={store}
            />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort as string}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
              <FilterViewDropdown type="mediator" options={filterView} />
            </div>
          </div>
          {dashboardData?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
                active={payload.params?.page?.size}
                meta={dashboardData?.meta}
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
export default Dashboard;
