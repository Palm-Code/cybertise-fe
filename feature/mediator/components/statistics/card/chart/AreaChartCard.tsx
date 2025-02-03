"use client";
import React from "react";
import { Wrapper } from "../Wrapper";
import { cn } from "@/core/lib/utils";
import { Coins } from "lucide-react";
import { iconColor } from "@/core/constants/common";
import { Typography } from "@/core/ui/components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { I_GetAnalyticsResponse } from "@/core/models/common/analytics";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { useQueryState } from "nuqs";

const CustomDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props; // Coordinates of the dot
  return (
    <g>
      {/* Outer glow */}
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill="currentColor"
        className={cn("text-violet-normal/25")}
      />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="currentColor"
        stroke="#ffffff"
        strokeWidth={2}
        className={cn("!text-violet-normal")}
      />
    </g>
  );
};

type AreaChartPropsType = {
  data?: I_GetAnalyticsResponse["ticket_reports"];
};

export const AreaChartCard = ({ data }: AreaChartPropsType) => {
  const [ticket_status, setTicket_status] = useQueryState("ticket_status");
  return (
    <Wrapper className={cn("gap-3")}>
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
          <AreaChart
            className={cn("h-full w-full max-w-full scale-100 !text-xs")}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            defaultShowTooltip
          >
            <defs>
              <linearGradient
                id="paint0_linear_4549_92819"
                x1="217.5"
                y1="0.318359"
                x2="217.5"
                y2="150"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#845EEE" stopOpacity="0.3" />
                <stop offset="1" stopColor="#845EEE" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis
              interval={0}
              ticks={[0, 200, 400, 600, 800, 1000]}
              domain={[0, "dataMax"]}
            />
            <CartesianGrid
              strokeDasharray="8 3"
              stroke="#888"
              strokeOpacity={0.5}
            />
            <Tooltip
              itemStyle={{ color: "black" }}
              labelStyle={{ color: "black" }}
              isAnimationActive
              formatter={(value) => `${value} Tickets`}
              contentStyle={{ backgroundColor: "white" }}
            />
            <Area
              type="monotone"
              dot={<CustomDot cx={0} cy={0} />}
              dataKey="value"
              stroke="#845EEE"
              fillOpacity={1}
              fill="url(#paint0_linear_4549_92819)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};
