"use client";
import { filterView } from "@/core/constants/dashboard";
import {
  FilterViewDropdown,
  Pagination,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useReadLocalStorage } from "usehooks-ts";
import ProgramsFilterDropdown from "./_dropdown/ProgramFilter.component";
import { VRPCardView, VRPGridView, VRPTableView } from "../../containers";
import { VRPCardType } from "@/types/admin/vrp-launchpad";
import { tableColumns } from "../../constants/vrp-launchpad";
import SortBy from "./_dropdown/SortBy.component";

const VRPLaunchpad = ({ data }: { data: VRPCardType[] }) => {
  const view = useReadLocalStorage("view") as "table" | "card" | "grid";

  const viewsContainer = {
    table: <VRPTableView columns={tableColumns} data={data} />,
    card: <VRPCardView data={data} />,
    grid: <VRPGridView data={data} />,
  };

  return (
    <div className="_flexbox__col__start__start min-h-full w-full gap-10">
      <div className="grid w-full grid-cols-2 place-items-center content-between">
        <Typography variant="h4" weight="bold" className="mr-auto">
          VRP Launchpad
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
        <Typography variant="h6" weight="bold">
          Search VRP Launchpad
        </Typography>
        <SearchInput variant="mediator" placeholder="Try search company name" />
        <ProgramsFilterDropdown />
      </div>
      <div className="_flexbox__row__center__between w-full">
        <SortBy />
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
          variant="hacker"
          type="ticket"
          buttonText="See VRP Launchpad"
        />
      )}
    </div>
  );
};
export default VRPLaunchpad;
