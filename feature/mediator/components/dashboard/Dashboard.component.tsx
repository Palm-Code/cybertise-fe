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
import { useGetTableColumns } from "../../constants/dashboard";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";
import {
  DashboardCardView,
  DashboardGridView,
  DashboardTableView,
} from "../../containers";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useChatListParamStore } from "../../zustand/store/dashboard";
import { useGetChatList } from "../../query/client";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("DashboardMediator");
  const tableColumns = useGetTableColumns();
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const {
    queryDesktop: {
      data: dashboardData,
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
  const mobileDashboardData = data?.pages.map((page) => page.data).flat();
  const { ref, inView } = useInView({ threshold: 0.5 });
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

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
  }, [inView]);

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

  if (!dashboardData) return <Loader variant="mediator" />;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10">
          <div className="_flexbox__row__center__between w-full">
            <Typography
              variant="h4"
              weight="bold"
              className="mr-auto"
            >
              {t("title")}
            </Typography>
            <SearchInput
              isMobile
              id="search-dashboard-mediator"
              value={payload?.params?.search}
              variant="mediator"
              placeholder={t("placeholder_search")}
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, mobileRefetch)
              }
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, mobileRefetch)
              }
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter
              variant="mediator"
              store={store}
            />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
          </div>
          {!!payload?.params?.search && (
            <Typography
              variant="p"
              affects="small"
            >
              Show result for "{payload?.params?.search}"
            </Typography>
          )}
          {!data && <ChatListCardLoadingList isGridCard />}
          {mobileDashboardData?.length! ? (
            <>
              <DashboardGridView
                data={mobileDashboardData}
                isLoading={mobileIsLoading || mobileIsFetching}
              />
              <div
                ref={ref}
                className="w-full space-y-6"
              >
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="mediator"
              type="ticket"
              buttonText={t("see_programs")}
              href="/vrp-launchpad"
            />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10">
          <div className="grid w-full grid-cols-2 place-items-center content-between">
            <Typography
              variant="h4"
              weight="bold"
              className="mr-auto"
            >
              {t("title")}
            </Typography>
            <div className="ml-auto w-full max-w-xl">
              <SearchInput
                id="search-dashboard-mediator"
                variant="mediator"
                placeholder={t("placeholder_search")}
                value={payload?.params?.search}
                onChange={(e) =>
                  useOnchangeSearch(e.target.value, store, refetch)
                }
                loadingSubmit={isRefetching}
                disabledButton={isRefetching}
                onSubmitSearch={() =>
                  useSubmitSearch(payload.params?.search, refetch)
                }
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-4">
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
              <FilterViewDropdown
                type="mediator"
                options={filterView}
              />
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
              href="/vrp-launchpad"
              buttonText={t("see_programs")}
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default Dashboard;
