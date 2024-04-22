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
import {
  ProgramsCardView,
  ProgramsGridView,
  ProgramsTableView,
} from "../../containers";
import { tableColumns } from "../../constants/programs";
import ProgramsFilterDropdown from "./_dropdown/ProgramFilter.component";
import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "@/core/ui/layout";
import DashboardFilter from "@/core/ui/components/dropdown/dashboard-filter-drowpdown";
import { useGetProgramList } from "../../query/client/useGetProgramList";
import { useProgramListParamStore } from "../../zustand/store/programs";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";

const Dashboard = () => {
  const store = useProgramListParamStore();
  const { payload, setPayload } = store;
  const {
    data: programList,
    isLoading,
    isFetching,
    isRefetching,
    refetch: refetchProgramList,
  } = useGetProgramList(payload);
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <ProgramsTableView
        isLoading={isLoading || isFetching}
        columns={tableColumns}
        data={programList?.data}
      />
    ),
    card: (
      <ProgramsCardView
        isLoading={isLoading || isFetching}
        data={programList?.data}
      />
    ),
    grid: (
      <ProgramsGridView
        isLoading={isLoading || isFetching}
        data={programList?.data}
      />
    ),
  };

  const submitChange = (type: "type" | "has_asset_type", value: string) => {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        filter: {
          ...payload.params?.filter,
          [type]: value === "all" ? undefined : value,
        },
      },
    });
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
                  value={payload.params?.sort}
                  options={filterItems}
                  onValueChange={(v) => useClickSort(v, store)}
                />
              </div>
            </div>
          </div>
          {programList && programList.data.length! ? (
            <ProgramsGridView
              isLoading={isLoading || isFetching}
              data={programList?.data}
            />
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pt-12">
          <div className="grid w-full grid-cols-2 place-items-center content-between">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Bug Bounty Programs
            </Typography>
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown type="hacker" options={filterView} />
            </div>
          </div>
          <div
            className={cn(
              "_flexbox__col__start__start w-full gap-6 rounded-2xl",
              "bg-background-main-light px-12 py-8 dark:bg-background-main-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              Search around 400+ programs
            </Typography>
            <SearchInput
              variant="hacker"
              placeholder="Search for programs"
              value={payload.params?.search}
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetchProgramList)
              }
              loadingSubmit={isLoading && isRefetching}
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchProgramList)
              }
            />
            <ProgramsFilterDropdown
              payload={payload}
              onValueChangeType={(v) => submitChange("type", v)}
              onValueChangeAssetType={(v) => submitChange("has_asset_type", v)}
            />
          </div>
          {programList && programList.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="hacker"
                active={payload.params?.page?.size}
                meta={programList?.meta}
                activePage={payload.params?.page?.number}
                onClickPrevious={() =>
                  useClickPaginate(payload?.params?.page?.number! - 1, store)
                }
                onClickNext={() =>
                  useClickPaginate(payload?.params?.page?.number! + 1, store)
                }
                setActivePage={(v) => useClickPaginate(v, store)}
                onClickShow={(v) =>
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      page: { ...payload.params?.page!, size: v },
                    },
                  })
                }
              />
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
export default Dashboard;
