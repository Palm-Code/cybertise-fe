"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import { I_TableReportTicketData, I_TableTicketData } from "@/interfaces";
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";
import {
  ReportsCardView,
  ReportsGridView,
  ReportsTableView,
} from "../../containers";
import { tableColumns } from "../../constants/reports";
import { Desktop, Mobile } from "@/core/ui/layout";

const Reports = ({ data }: { data: I_TableReportTicketData[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <ReportsTableView columns={tableColumns} data={data} />,
    card: <ReportsCardView data={data} />,
    grid: <ReportsGridView data={data} />,
  };

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 px-6 pb-28 pt-12">
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
            <ReportsGridView data={data} />
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pb-28 pt-12">
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
            viewsContainer[view]
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
export default Reports;
