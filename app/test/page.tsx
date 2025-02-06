"use client";
import { cn } from "@/core/lib/utils";
import { I_GetAnalyticsSuccessResponse } from "@/core/models/common/analytics";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import { AreaChartCard } from "@/feature/hacker/components/statistics/card/chart";

export const dummyChartData: I_GetAnalyticsSuccessResponse["data"]["ticket_reports"] =
  [
    { date: "2025-01-30", value: 10 },
    { date: "2025-01-31", value: 20 },
    { date: "2025-02-01", value: 50 },
    { date: "2025-02-02", value: 70 },
    { date: "2025-02-03", value: 80 },
    { date: "2025-02-04", value: 20 },
    { date: "2025-02-05", value: 50 },
  ];

export default function Test() {
  const ticket_reports: { date: string; value: number }[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(2025, 0, 30 + i);
    const formattedDate = date.toISOString().split("T")[0];
    const randomValue = Math.floor(Math.random() * 101);
    ticket_reports.push({ date: formattedDate, value: randomValue });
  }
  return (
    <MobileLayout className={cn("container py-12")}>
      <AreaChartCard data={ticket_reports} />
    </MobileLayout>
  );
}
