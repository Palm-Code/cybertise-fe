"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  Loader,
  Pagination,
} from "@/core/ui/components";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import {
  DashboardCardView,
  DashboardGridView,
  DashboardTableView,
} from "@/feature/mediator/containers";
import { tableColumns } from "@/feature/mediator/constants/dashboard";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useGetChatList } from "@/feature/mediator/query/client";
import { useChatListParamStore } from "@/feature/mediator/zustand/store/dashboard";
import { useClickPaginate, useClickSort } from "@/core/hooks";
import { useInView } from "react-intersection-observer";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { useEffect } from "react";

const ActiveTicket = ({ id }: { id: string }) => {
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const {
    queryDesktop: { data: ticketData, isLoading, isFetching },
    queryMobile: {
      data,
      isLoading: mobileIsLoading,
      isFetching: mobileIsFetching,
      isFetchingNextPage,
      fetchNextPage,
    },
  } = useGetChatList({
    params: {
      ...payload.params,
      filter: {
        ...payload.params?.filter,
        company_id: id,
        ticket_type: "company",
      },
    },
  });
  const mobileTicketData = data?.pages.map((page) => page.data).flat();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <DashboardTableView
        columns={tableColumns}
        data={ticketData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    card: (
      <DashboardCardView
        data={ticketData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: (
      <DashboardGridView
        data={ticketData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) return <Loader variant="mediator" className="h-[50vh]" />;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start min-h-full w-full gap-6">
          <div className="inline-flex gap-4">
            <FilterDropdown
              variant="mediator"
              value={payload?.params?.sort as string}
              options={filterItems}
              onValueChange={(v) => useClickSort(v, store)}
            />
          </div>
          {!data && <ChatListCardLoadingList isGridCard />}
          {mobileTicketData?.length! ? (
            <>
              <DashboardGridView
                data={mobileTicketData}
                isLoading={mobileIsLoading || mobileIsFetching}
              />
              <div ref={ref} className="w-full">
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState variant="mediator" type="ticket" />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-6">
          <div className="_flexbox__row__center__between w-full">
            <div className="mr-auto w-fit max-w-xl">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort as string}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown type="mediator" options={filterView} />
            </div>
          </div>
          {ticketData?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
                active={payload.params?.page?.size}
                meta={ticketData?.meta}
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
            <EmptyState variant="mediator" type="ticket" />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default ActiveTicket;
