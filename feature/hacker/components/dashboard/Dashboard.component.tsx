"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { TableView, TicketView } from "../../container";
import { tableColumns, tableTicketData } from "../../constants/dashboard";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useState } from "react";
import MultiFilterDropdown from "@/core/ui/components/dropdown/multi-filter-drowpdown";

const Dashboard = () => {
  const [view, setView] = useState<"table" | "card">("card");
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
          <FilterViewDropdown
            type="hacker"
            value={view}
            options={filterView}
            onValueChange={(v) => setView(v)}
          />
        </div>
      </div>
      {view === "table" ? (
        <TableView columns={tableColumns} data={tableTicketData} />
      ) : (
        <TicketView />
      )}
      {/* <EmptyState
        variant="hacker"
        type="ticket"
        buttonText="See VRP Launchpad"
      /> */}
    </div>
  );
};
export default Dashboard;
