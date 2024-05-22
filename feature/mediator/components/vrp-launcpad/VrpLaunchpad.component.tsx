"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  Button,
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
import { VRPCardView, VRPGridView, VRPTableView } from "../../containers";
import { tableColumns } from "../../constants/vrp-launchpad";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useProgramListParamStore } from "../../zustand/store/programs";
import { useGetProgramList } from "../../query/client";
import {
  useClickPaginate,
  useClickSort,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import { useGetAssetType } from "@/core/react-query/client";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const VRPLaunchpad = () => {
  const store = useProgramListParamStore();
  const { data: assetType } = useGetAssetType();
  const { payload, setPayload } = store;
  const {
    queryDesktop: {
      data: programsData,
      isLoading,
      isFetching,
      refetch: refetchProgramData,
      isRefetching,
    },
    queryMobile: {
      data,
      isLoading: mobileIsLoading,
      refetch: mobileRefetch,
      isFetching: mobileIsFetching,
      isFetchingNextPage,
      fetchNextPage,
    },
  } = useGetProgramList(payload);
  const mobileProgramData = data?.pages.map((page) => page.data).flat();
  const { ref, inView } = useInView({ threshold: 0.5 });

  const view =
    (useReadLocalStorage("view") as "table" | "card" | "grid") || "card";

  const viewsContainer = {
    table: (
      <VRPTableView
        columns={tableColumns}
        data={programsData?.data || []}
        isLoading={isLoading || isFetching}
      />
    ),
    card: (
      <VRPCardView
        data={programsData?.data || []}
        isLoading={isLoading || isFetching}
      />
    ),
    grid: (
      <VRPGridView
        data={programsData?.data || []}
        isLoading={isLoading || isFetching}
      />
    ),
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!programsData) return <Loader variant="mediator" />;

  const submitChange = (type: string, value: string) => {
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 px-6 py-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              VRP Launchpad
            </Typography>
            <SearchInput
              value={payload?.params?.search}
              variant="mediator"
              placeholder="Try “#21231” or “Company name”"
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, mobileRefetch)
              }
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, mobileRefetch)
              }
            />
          </div>
          <div className="_flexbox__row__start__start w-full gap-4 overflow-auto">
            <Button
              fullWidth
              className="max-w-24"
              variant={
                payload.params?.filter?.status === undefined
                  ? "primary-mediator"
                  : "secondary-mediator"
              }
              onClick={() => {
                submitChange("status", "all");
              }}
            >
              All
            </Button>
            <Button
              variant={
                payload.params?.filter?.status === "Phase2"
                  ? "primary-mediator"
                  : "secondary-mediator"
              }
              onClick={() => submitChange("status", "Phase2")}
            >
              Phase 2
            </Button>
            <Button
              variant={
                payload.params?.filter?.status === "Phase4"
                  ? "primary-mediator"
                  : "secondary-mediator"
              }
              onClick={() => submitChange("status", "Phase4")}
            >
              Phase 4
            </Button>
          </div>
          <div className="_flexbox__row__center__between w-full">
            <ProgramsFilterDropdown
              variant="mediator"
              store={store}
              assetTypeOptions={assetType}
              onValueChange={(v, t) => submitChange(t, v)}
            />
            <div className="inline-flex gap-4">
              <FilterDropdown
                variant="mediator"
                value={payload.params?.sort}
                options={filterItems}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
          </div>
          {!data && <ChatListCardLoadingList isGridCard />}
          {mobileProgramData?.length! ? (
            <>
              <VRPGridView
                data={mobileProgramData}
                isLoading={mobileIsLoading || mobileIsFetching}
              />
              <div ref={ref} className="w-full space-y-6">
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pb-28 pt-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h4" weight="bold" className="mr-auto">
              VRP Launchpad
            </Typography>
            <div className="grid w-fit grid-cols-3 gap-4">
              <Button
                variant={
                  payload.params?.filter?.status === undefined
                    ? "primary-mediator"
                    : "secondary-mediator"
                }
                onClick={() => {
                  submitChange("status", "all");
                }}
                fullWidth
              >
                All
              </Button>
              <Button
                variant={
                  payload.params?.filter?.status === "Phase2"
                    ? "primary-mediator"
                    : "secondary-mediator"
                }
                onClick={() => submitChange("status", "Phase2")}
              >
                Phase 2
              </Button>
              <Button
                variant={
                  payload.params?.filter?.status === "Phase4"
                    ? "primary-mediator"
                    : "secondary-mediator"
                }
                onClick={() => {
                  submitChange("status", "Phase4");
                }}
              >
                Phase 4
              </Button>
            </div>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
            <Typography variant="h6" weight="bold">
              Search VRP Launchpad
            </Typography>
            <SearchInput
              variant="mediator"
              placeholder="Try “#21231” or “Company name”"
              value={payload?.params?.search}
              onChange={(e) =>
                useOnchangeSearch(e.target.value, store, refetchProgramData)
              }
              loadingSubmit={isLoading && isRefetching}
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchProgramData)
              }
            />
            <ProgramsFilterDropdown
              store={store}
              assetTypeOptions={assetType}
              onValueChange={(v, t) => submitChange(t, v)}
            />
          </div>
          <div className="_flexbox__row__center__between w-full">
            <div className="inline-flex gap-4">
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
          {programsData?.data.length! ? (
            <>
              {viewsContainer[view]}
              <Pagination
                variant="mediator"
                active={payload.params?.page?.size}
                meta={programsData?.meta}
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
