"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  Button,
  FilterDropdown,
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
import { Desktop, Mobile } from "@/core/ui/layout";
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";

const VRPLaunchpad = ({ data }: { data: VRPCardType[] }) => {
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: <VRPTableView columns={tableColumns} data={data} />,
    card: <VRPCardView data={data} />,
    grid: <VRPGridView data={data} />,
  };

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              VRP Launchpad
            </Typography>
            <SearchInput
              variant="mediator"
              placeholder="Try search company name"
            />
          </div>
          <div className="_flexbox__row__start__start w-full gap-4 overflow-auto">
            <Button variant="primary-mediator" fullWidth className="max-w-24">
              All
            </Button>
            <Button variant="secondary-mediator">Phase 2</Button>
            <Button variant="secondary-mediator">Phase 4</Button>
          </div>
          <div className="_flexbox__row__center__between w-full">
            <DashboardFilter variant="mediator" />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value="Sort By"
                options={filterItems}
                onValueChange={() => {}}
              />
            </div>
          </div>
          {data.length! ? (
            <>
              <VRPGridView data={data} />
            </>
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
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              VRP Launchpad
            </Typography>
            <div className="grid w-fit grid-cols-3 gap-4">
              <Button variant="primary-mediator" fullWidth>
                All
              </Button>
              <Button variant="secondary-mediator">Phase 2</Button>
              <Button variant="secondary-mediator">Phase 4</Button>
            </div>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
            <Typography variant="h6" weight="bold">
              Search VRP Launchpad
            </Typography>
            <SearchInput
              variant="mediator"
              placeholder="Try search company name"
            />
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
      </Desktop>
    </>
  );
};
export default VRPLaunchpad;
