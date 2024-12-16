"use client";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useTranslations } from "next-intl";
import React from "react";
import { OverviewCard } from "./card";
import { AreaChartCard, PieChartCard } from "./card/chart";
import { FilterStatistic } from "./filter";
import { TicketListCard } from "./card/ticket";
import { useChatListParamStore } from "../../zustand/store/dashboard";
import { useGetChatList } from "../../query/client";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const Statistics = () => {
  const t = useTranslations("DashboardCompany");
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const {
    queryDesktop: {
      data: dashboardData,
      isLoading,
      isFetching,
      refetch,
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
  } = useGetChatList({
    params: {
      ...payload.params,
      page: {
        size: 5,
        number: 1,
      },
      filter: {
        ...payload.params?.filter,
      },
    },
  });
  return (
    <>
      <MobileLayout>
        <EmptyState type="under-construction" variant="company" />
      </MobileLayout>
      <DesktopLayout>
        <div className={cn("flex w-full flex-col gap-10")}>
          <div className={cn("flex w-full items-center justify-between")}>
            <Typography variant="h4">{t("overview")}</Typography>
            <FilterStatistic />
          </div>
          <div className={cn("grid grid-cols-3 items-center gap-5")}>
            <OverviewCard title="Bounties Paid" />
            <OverviewCard title="Active Tickets" />
            <OverviewCard title="Active Programs" />
          </div>
          <div className={cn("grid w-full grid-cols-2 items-center gap-5")}>
            <AreaChartCard />
            <PieChartCard />
          </div>
          <TicketListCard data={dashboardData?.data} />
        </div>
      </DesktopLayout>
    </>
  );
};

export default Statistics;
