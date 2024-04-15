"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
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

const Dashboard = ({ data }: { data: I_TableTicketData[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <DashboardTableView columns={tableColumns} data={data} />,
    card: <DashboardCardView data={data} />,
    grid: <DashboardGridView data={data} />,
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
              variant="company"
              placeholder="Try “#21231” or “Company name”"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter variant="company" />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="company"
                value="Sort By"
                options={filterItems}
                onValueChange={() => {}}
              />
            </div>
          </div>
          {data.length! ? (
            <>
              <DashboardGridView data={data} />
            </>
          ) : (
            <EmptyState
              variant="company"
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
                variant="company"
                placeholder="Try “#21231” or “Company name”"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter variant="company" />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="company"
                value="Sort By"
                options={filterItems}
                onValueChange={() => {}}
              />
              <FilterViewDropdown type="company" options={filterView} />
            </div>
          </div>
          {data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination variant="company" />
            </>
          ) : (
            <EmptyState
              variant="company"
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
