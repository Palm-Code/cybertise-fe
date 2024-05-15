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
import SortByDropdown from "../../../_dropdown/SortBy.component";
import { tableColumns } from "@/feature/mediator/constants/dashboard";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useGetChatList } from "@/feature/mediator/query/client";
import { useChatListParamStore } from "@/feature/mediator/zustand/store/dashboard";
import useLoadMore from "@/core/hooks/useLoadMore";
import { useClickPaginate, useClickSort } from "@/core/hooks";
import { DashboardTicketCardList } from "@/core/ui/container";

const ActiveTicket = ({ id }: { id: string }) => {
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const { data, isLoading, isFetching, isError, isRefetching } = useGetChatList(
    {
      params: {
        ...payload.params,
        filter: {
          ...payload.params?.filter,
          company_id: id,
          ticket_type: "company",
        },
      },
    }
  );
  const pageNumbers = data?.meta?.last_page || 1;
  const { ref } = useLoadMore(store, pageNumbers);
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  if (!data) return <Loader variant="mediator" className="h-[50vh]" />;
  if (isError) return <EmptyState variant="mediator" type="ticket" />;
  const viewsContainer = {
    table: (
      <DashboardTableView
        columns={tableColumns}
        data={data?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    card: (
      <DashboardCardView
        data={data?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: (
      <DashboardGridView
        data={data?.data}
        isLoading={isLoading || isFetching}
      />
    ),
  };

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
          {data?.data.length! ? (
            <>
              <DashboardGridView
                data={data.data}
                isLoading={isLoading || isFetching}
              />
              <div ref={ref} className="w-full">
                {isFetching && !isRefetching ? (
                  <DashboardTicketCardList isGridCard />
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
          {data?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
                active={payload.params?.page?.size}
                meta={data?.meta}
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
export default ActiveTicket;
