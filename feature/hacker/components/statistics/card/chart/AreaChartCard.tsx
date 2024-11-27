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

const data = [
  { name: "22/10/24", value: 50 },
  { name: "29/10/24", value: 80 },
  { name: "5/11/24", value: 80 },
  { name: "12/11/24", value: 70 },
  { name: "19/11/24", value: 90 },
  { name: "22/11/24", value: 60 },
];

const CustomDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props; // Coordinates of the dot
  return (
    <g>
      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={12} fill="rgba(170, 255, 0, 0.2)" />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="currentColor"
        stroke="#ffffff"
        strokeWidth={2}
        className={cn("text-lime-normal-light dark:text-lime-normal-dark")}
      />
    </g>
  );
};

export const AreaChartCard = () => {
  return (
    <Wrapper className={cn("gap-3")}>
      <div className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}>
        <Coins className={iconColor.hacker} />
        <Typography variant="p" affects="normal" weight="semibold">
          Open Ticket
        </Typography>
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
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BAFF00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#BAFF00" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis
              interval={0}
              ticks={[0, 20, 40, 60, 80, 100]}
              domain={[0, "dataMax"]}
            />
            <CartesianGrid
              strokeDasharray="8 3"
              stroke="#888"
              strokeOpacity={0.5}
            />
            <Tooltip itemStyle={{ color: "black" }} />
            <Area
              type="monotone"
              dot={<CustomDot cx={0} cy={0} />}
              dataKey="value"
              stroke="#BAFF00"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};
