"use client";
import { filterView } from "@/core/constants/dashboard";
import { FilterViewDropdown, Pagination } from "@/core/ui/components";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import {
  DashboardCardView,
  DashboardGridView,
  DashboardTableView,
} from "@/feature/mediator/containers";
import SortByDropdown from "../../../_dropdown/SortBy.component";
import { I_TableTicketData } from "@/interfaces";
import { tableColumns } from "@/feature/mediator/constants/dashboard";
import { Desktop, Mobile } from "@/core/ui/layout";

const ActiveTicket = ({ data }: { data: I_TableTicketData[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <DashboardTableView columns={tableColumns} data={data as any} />,
    card: <DashboardCardView data={data as any} />,
    grid: <DashboardGridView data={data as any} />,
  };

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start min-h-full w-full gap-6">
          {data.length! ? (
            <>
              <DashboardGridView data={data as any} />
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
            <SortByDropdown />
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown type="mediator" options={filterView} />
            </div>
          </div>
          {data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination variant="mediator" />
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
