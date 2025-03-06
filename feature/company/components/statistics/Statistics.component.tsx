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
import { useGetAnalytics, useGetChatList } from "../../query/client";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { OverviewSwiper } from "./swiper/overview";
import { DashboardCardView } from "../../containers";

const Statistics = () => {
  const t = useTranslations("DashboardCompany");
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics();
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
        <div className={cn("flex w-full flex-col gap-10")}>
          <div className={cn("flex w-full items-center justify-between px-6")}>
            <Typography variant="h4">{t("overview")}</Typography>
            <FilterStatistic />
          </div>
          <OverviewSwiper data={analytics?.data} />
          <div
            className={cn(
              "grid w-full grid-cols-1 items-center gap-5 px-6 md:px-0"
            )}
          >
            <PieChartCard data={analytics?.data.overall_risk_reported ?? []} />
            <AreaChartCard
              tick={analytics?.data.left_tick ?? []}
              data={analytics?.data.ticket_reports ?? []}
            />
          </div>
          <DashboardCardView data={dashboardData?.data} />
        </div>
      </MobileLayout>
      <DesktopLayout>
        <div className={cn("flex w-full flex-col gap-10")}>
          <div className={cn("flex w-full items-center justify-between")}>
            <Typography variant="h4">{t("overview")}</Typography>
            <FilterStatistic />
          </div>
          <OverviewSwiper data={analytics?.data} />
          <div className={cn("grid w-full grid-cols-2 items-center gap-5")}>
            <AreaChartCard
              tick={analytics?.data.left_tick ?? []}
              data={analytics?.data.ticket_reports ?? []}
            />
            <PieChartCard data={analytics?.data.overall_risk_reported ?? []} />
          </div>
          <TicketListCard data={dashboardData?.data} />
        </div>
      </DesktopLayout>
    </>
  );
};

export default Statistics;
