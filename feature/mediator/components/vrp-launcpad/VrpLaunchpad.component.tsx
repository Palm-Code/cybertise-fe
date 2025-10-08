"use client";
import {
  filterItems,
  filterSortBy,
  filterView,
} from "@/core/constants/dashboard";
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
import { useGetVrpLaunchpadTableColumns } from "../../constants/vrp-launchpad";
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
import { useTranslations } from "next-intl";

const VRPLaunchpad = () => {
  const t = useTranslations("ProgramsMediator");
  const tableColumns = useGetVrpLaunchpadTableColumns();
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
      setTimeout(() => {
        fetchNextPage();
      }, 200);
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
            <Typography
              variant="h4"
              weight="bold"
              className="mr-auto"
            >
              {t("title")}
            </Typography>
            <SearchInput
              isMobile
              id="search-vrp-launchpad-mediator-mobile"
              value={payload?.params?.search}
              variant="mediator"
              placeholder={t("placeholder_search")}
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
              {t("button_all")}
            </Button>
            <Button
              variant={
                payload.params?.filter?.status === "Phase2"
                  ? "primary-mediator"
                  : "secondary-mediator"
              }
              onClick={() => submitChange("status", "Phase2")}
            >
              {t("button_phase_2")}
            </Button>
            <Button
              variant={
                payload.params?.filter?.status === "Phase4"
                  ? "primary-mediator"
                  : "secondary-mediator"
              }
              onClick={() => submitChange("status", "Phase4")}
            >
              {t("button_phase_4")}
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
              <div
                ref={ref}
                className="w-full space-y-6"
              >
                {isFetchingNextPage ? (
                  <ChatListCardLoadingList isGridCard />
                ) : null}
              </div>
            </>
          ) : (
            <EmptyState
              variant="mediator"
              type="ticket"
              buttonText={t("see_programs")}
            />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-10 pb-28 pt-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography
              variant="h4"
              weight="bold"
              className="mr-auto"
            >
              {t("title")}
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
                {t("button_all")}
              </Button>
              <Button
                variant={
                  payload.params?.filter?.status === "Phase2"
                    ? "primary-mediator"
                    : "secondary-mediator"
                }
                onClick={() => submitChange("status", "Phase2")}
              >
                {t("button_phase_2")}
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
                {t("button_phase_4")}
              </Button>
            </div>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
            <Typography
              variant="h6"
              weight="bold"
            >
              {t("search_title")}
            </Typography>
            <SearchInput
              id="search-vrp-launchpad-mediator"
              variant="mediator"
              placeholder={t("placeholder_search")}
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
                options={filterSortBy.timestamp}
                onValueChange={(v) => useClickSort(v, store)}
              />
            </div>
            <div className="ml-auto w-fit max-w-xl">
              <FilterViewDropdown
                type="mediator"
                options={filterView}
              />
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
              buttonText={t("see_programs")}
            />
          )}
        </div>
      </Desktop>
    </>
  );
};
export default VRPLaunchpad;
