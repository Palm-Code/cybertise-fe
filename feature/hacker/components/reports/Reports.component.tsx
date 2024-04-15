"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  Pagination,
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
import { cn } from "@/core/lib/utils";

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
        <div
          className={cn(
            "_flexbox__col__start__start min-h-full w-full gap-10 pt-8",
            "px-6 pb-8"
          )}
        >
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <div className="_flexbox__row__center__between w-full">
              <Typography variant="h4" weight="bold" className="mr-auto">
                Programs
              </Typography>
              <SearchInput variant="hacker" placeholder="Search for programs" />
            </div>
            <div className="flex w-full items-center justify-between gap-4 sm:justify-start">
              <DashboardFilter variant="hacker" />
              <div className="inline-flex min-w-32 gap-4">
                <FilterDropdown
                  variant="hacker"
                  value="Sort By"
                  options={filterItems}
                  onValueChange={() => {}}
                />
              </div>
            </div>
          </div>
          {data.length! ? (
            <ReportsGridView data={data} />
          ) : (
            <EmptyState
              variant="hacker"
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
                variant="hacker"
                placeholder="Try “#21231” or “Company name”"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <DashboardFilter variant="hacker" />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="hacker"
                value="Sort By"
                options={filterItems}
                onValueChange={() => {}}
              />
              <FilterViewDropdown type="hacker" options={filterView} />
            </div>
          </div>
          {data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination variant="hacker" />
            </>
          ) : (
            <EmptyState
              variant="hacker"
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
