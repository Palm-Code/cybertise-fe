"use client";
import { filterView } from "@/core/constants/dashboard";
import { FilterViewDropdown, SearchInput } from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import {
  ProgramsCardView,
  ProgramsGridView,
  ProgramsTableView,
} from "../../containers";
import { ProgramCardType } from "@/types/admin/programs";
import { tableColumns } from "../../constants/programs";
import ProgramsFilterDropdown from "./_dropdown/ProgramFilter.component";

const Dashboard = ({ data }: { data: ProgramCardType[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <ProgramsTableView columns={tableColumns} data={data} />,
    card: <ProgramsCardView data={data} />,
    grid: <ProgramsGridView data={data} />,
  };

  return (
    <div className="_flexbox__col__start__start min-h-full w-full gap-10 pt-12">
      <div className="grid w-full grid-cols-2 place-items-center content-between">
        <Typography variant="h4" weight="bold" className="mr-auto">
          Bug Bounty Programs
        </Typography>
        <div className="ml-auto w-fit max-w-xl">
          <FilterViewDropdown type="hacker" options={filterView} />
        </div>
      </div>
      <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
        <Typography variant="h6" weight="bold">
          Search around 400+ programs
        </Typography>
        <SearchInput variant="hacker" placeholder="Search for programs" />
        <ProgramsFilterDropdown />
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
