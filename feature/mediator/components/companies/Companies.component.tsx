"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  Loader,
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
import { Desktop, Mobile } from "@/core/ui/layout";
import { useCompaniesParamsStore } from "../../zustand/store/companies";
import { useGetCompanies } from "../../query/client";
import useLoadMore from "@/core/hooks/useLoadMore";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import CompaniesFilter from "@/core/ui/components/dropdown/companies-filter-dropdown";
import { VRPCardLoadingList } from "@/core/ui/container";

const Companies = ({ data }: { data: VRPCardType[] }) => {
  const store = useCompaniesParamsStore();
  const { payload, setPayload } = store;
  const {
    data: companyData,
    isLoading,
    isFetching,
    isRefetching,
    refetch: refetchCompanyList,
  } = useGetCompanies(payload);
  const pageNumbers = companyData?.meta?.last_page || 1;
  const { ref } = useLoadMore(store, pageNumbers);
  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <CompaniesTableView
        columns={companiesTableColumns}
        isLoading={isLoading || isFetching}
        data={companyData?.data}
      />
    ),
    card: (
      <CompaniesCardView
        data={companyData?.data}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: <CompaniesGridView data={companyData?.data} />,
  };

  if (!companyData) return <Loader variant="mediator" />;

  const submitChange = (type: "status", value: string) => {
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 px-6 py-8">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              Companies
            </Typography>
            <SearchInput
              value={payload?.params?.search}
              variant="mediator"
              placeholder="Try search company name"
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetchCompanyList)
              }
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchCompanyList)
              }
            />
          </div>
          <div className="_flexbox__row__center__between w-full">
            <CompaniesFilter variant="mediator" store={store} />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort as string}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
          </div>
          {companyData.data.length! ? (
            <>
              <CompaniesGridView
                data={companyData.data}
                isLoading={isLoading || isFetching}
              />
              <div ref={ref} className="w-full">
                {isFetching && !isRefetching ? (
                  <VRPCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="mediator"
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
              Companies
            </Typography>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
            <Typography variant="h6" weight="bold">
              Search Company
            </Typography>
            <SearchInput
              variant="mediator"
              placeholder="Try search company name"
              value={payload.params?.search}
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetchCompanyList)
              }
              loadingSubmit={isLoading || isRefetching}
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchCompanyList)
              }
            />
            <CompaniesFilter
              variant="mediator"
              store={store}
              onValueChange={(v, t) => submitChange(t, v)}
            />
          </div>
          <div className="_flexbox__row__center__between w-full">
            <div className="mr-auto w-fit max-w-xl">
              <FilterDropdown
                variant="mediator"
                value={payload?.params?.sort as string}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown type="mediator" options={filterView} />
            </div>
          </div>
          {companyData.data?.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
                active={payload.params?.page?.size}
                meta={companyData?.meta}
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
              variant="mediator"
              type="default"
              titleText="No Companies Found"
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default Companies;
