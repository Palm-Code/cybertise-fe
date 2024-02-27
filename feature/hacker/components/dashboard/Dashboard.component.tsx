"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { TableView, TicketView } from "../../container";
import { tableColumns } from "../../constants/dashboard";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import MultiFilterDropdown from "@/core/ui/components/dropdown/multi-filter-drowpdown";
import { useReadLocalStorage } from "usehooks-ts";
import GridView from "../../container/dashboard/GridView.container";
import { I_TableTicketData } from "@/interfaces";

const Dashboard = ({ data }: { data: I_TableTicketData[] }) => {
  const view = useReadLocalStorage("view") as "table" | "card" | "grid";

  const viewsContainer = {
    table: <TableView columns={tableColumns} data={data} />,
    card: <TicketView data={data} />,
    grid: <GridView data={data} />,
  };

  return (
    <div className="_flexbox__col__start__start min-h-full w-full gap-10">
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
        <MultiFilterDropdown variant="hacker" />
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
        viewsContainer[view]
      ) : (
        <EmptyState
          variant="hacker"
          type="ticket"
          buttonText="See VRP Launchpad"
        />
      )}
    </div>
  );
};
export default Dashboard;
