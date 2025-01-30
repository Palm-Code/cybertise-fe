"use client";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useTranslations } from "next-intl";
import React from "react";
import { OverviewCard } from "./card";
import { AreaChartCard, BarChartCard, PieChartCard } from "./card/chart";
import { FilterStatistic } from "./filter";
import { TicketListCard } from "./card/ticket";
import { useChatListParamStore } from "../../zustand/store/dashboard";
import { useGetAnalytics, useGetChatList } from "../../query/client";

const Statistics = () => {
  const t = useTranslations("DashboardMediator");
  const store = useChatListParamStore();
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics();
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
  } = useGetChatList(payload);
  return (
    <DesktopLayout>
      <div className={cn("flex w-full flex-col gap-10")}>
        <div className={cn("flex w-full items-center justify-between")}>
          <Typography variant="h4">{t("overview")}</Typography>
          <FilterStatistic />
        </div>
        <div className={cn("grid grid-cols-4 items-center gap-5")}>
          <OverviewCard
            title={t("published_vrp")}
            value={analytics?.data.published_vrp || 0}
            changes={analytics?.data.published_vrp_changes || 0}
          />
          <OverviewCard
            title={t("unpublished_vrp")}
            value={analytics?.data.unpublished_vrp || 0}
            changes={analytics?.data.unpublished_vrp_changes || 0}
          />
          <OverviewCard
            title={t("active_tickets")}
            value={analytics?.data.total_active_tickets || 0}
            changes={analytics?.data.total_active_tickets_changes || 0}
          />
          <OverviewCard
            title={t("valid_tickets")}
            value={analytics?.data.total_valid_tickets || 0}
            changes={analytics?.data.total_valid_tickets_changes || 0}
          />
        </div>
        <div className={cn("grid w-full grid-cols-2 items-center gap-5")}>
          <AreaChartCard data={analytics?.data.ticket_reports ?? []} />
          <PieChartCard data={analytics?.data.overall_risk_reported ?? []} />
        </div>
        <BarChartCard data={analytics?.data.ytd_bar_chart ?? []} />
        <TicketListCard data={dashboardData?.data} />
      </div>
    </DesktopLayout>
  );
};

export default Statistics;
