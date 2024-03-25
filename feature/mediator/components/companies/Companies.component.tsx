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
import { VRPCardType } from "@/types/admin/vrp-launchpad";
import { companiesTableColumns } from "../../constants/vrp-launchpad";
import {
  CompaniesCardView,
  CompaniesGridView,
  CompaniesTableView,
} from "../../containers";
import SortByDropdown from "./_dropdown/SortBy.component";

const Companies = ({ data }: { data: VRPCardType[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <CompaniesTableView columns={companiesTableColumns} data={data} />,
    card: <CompaniesCardView data={data} />,
    grid: <CompaniesGridView data={data} />,
  };

  return (
    <div className="_flexbox__col__start__start min-h-full w-full gap-10 pt-12">
      <div className="grid w-full grid-cols-2 place-items-center content-between">
        <Typography variant="h4" weight="bold" className="mr-auto">
          Companies
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
        <Typography variant="h6" weight="bold">
          Search Company
        </Typography>
        <SearchInput variant="mediator" placeholder="Try search company name" />
        <ProgramsFilterDropdown />
      </div>
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
  );
};
export default Companies;
