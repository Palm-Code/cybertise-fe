"use client";
import React from "react";
import { Wrapper } from "../Wrapper";
import { cn } from "@/core/lib/utils";
import { Coins } from "lucide-react";
import { iconColor } from "@/core/constants/common";
import { Typography } from "@/core/ui/components";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { I_GetAnalyticsResponse } from "@/core/models/common/analytics";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { useQueryState } from "nuqs";

type BarChartCardProps = {
  data: I_GetAnalyticsResponse["ytd_bar_chart"];
};

export const BarChartCard = ({ data }: BarChartCardProps) => {
  const [ticket_status, setTicket_status] = useQueryState("ticket_status");
  return (
    <Wrapper className={cn("hidden gap-3 lg:block")}>
      <div className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}>
        <Coins className={iconColor.mediator} />
        <BaseDropdown
          triggerClassName="[&>p]:text-xl !p-0"
          label=""
          options={[
            { label: "Open", value: "Open" },
            { label: "Closed", value: "Closed" },
            { label: "Waiting for Payment", value: "waiting_for_payment" },
          ]}
          value={ticket_status ?? "Open"}
          onValueChange={(v) => {
            setTicket_status(v);
          }}
        />
      </div>
      <div className={cn("h-[300px] w-full")}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              width={25}
              dataKey="hacker"
              fill="#B59EF5"
              label={{ position: "insideTop", fill: "white", fontSize: "16px" }}
            />
            <Bar
              width={25}
              dataKey="company"
              fill="#845EEE"
              label={{ position: "insideTop", fill: "white", fontSize: "16px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};
