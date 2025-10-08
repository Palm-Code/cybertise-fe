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
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import { Dropdown } from "../../filter/Dropdown";
import { filterItems } from "@/feature/mediator/constants/dashboard";

type AreaChartPropsType = {
  data?: I_GetAnalyticsResponse["ticket_reports"];
  tick?: I_GetAnalyticsResponse["left_tick"];
};

export const AreaChartCard = ({
  data,
  tick = [-2, -1, 0, 1, 2],
}: AreaChartPropsType) => {
  const [ticket_status, setTicket_status] = useQueryState("ticket_status");

  return (
    <>
      <MobileLayout>
        <div
          className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
        >
          <Coins className={iconColor.mediator} />
          <Dropdown
            triggerClassName="[&>p]:text-xl !p-0"
            withIcon
            label=""
            options={filterItems.status.slice(1)}
            value={ticket_status ?? "Open"}
            onValueChange={(v) => {
              setTicket_status(v);
            }}
          />
        </div>
        <div className={cn("my-8 h-[300px] w-full")}>
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              className={cn(
                "h-full w-full max-w-full scale-110 !text-xs sm:scale-100"
              )}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              defaultShowTooltip
            >
              <defs>
                <linearGradient
                  id="paint0_linear_4549_92819"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    stopColor="#845EEE"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="1"
                    stopColor="#845EEE"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              {data?.every((d) => d.value === 0) ? (
                <YAxis
                  interval={0}
                  ticks={tick}
                  domain={[tick?.[0] ?? 0, "dataMax"]}
                  tickFormatter={(value) =>
                    data?.every((d) => d.value === 0) && value === 0
                      ? "0"
                      : value < 0 || value > 0
                        ? " "
                        : `${value}`
                  }
                />
              ) : (
                <YAxis
                  interval={0}
                  ticks={tick?.slice(2)}
                  domain={[tick?.[2] ?? 0, "dataMax"]}
                />
              )}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#888"
                horizontal
                vertical
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
                dataKey="value"
                stroke="#845EEE"
                fillOpacity={1}
                fill="url(#paint0_linear_4549_92819)"
                baseValue={
                  data?.every((d) => d.value === 0) ? tick?.[0] : tick?.[2]
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </MobileLayout>
      <DesktopLayout>
        <Wrapper className={cn("gap-3")}>
          <div
            className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
          >
            <Coins className={iconColor.mediator} />
            <Dropdown
              triggerClassName="[&>p]:text-xl !p-0"
              withIcon
              label=""
              options={filterItems.status.slice(1)}
              value={ticket_status ?? "Open"}
              onValueChange={(v) => {
                setTicket_status(v);
              }}
            />
          </div>
          <div className={cn("h-[300px] w-full")}>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                className={cn("h-full w-full max-w-full scale-100 !text-xs")}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                defaultShowTooltip
              >
                <defs>
                  <linearGradient
                    id="paint0_linear_4549_92819"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      stopColor="#845EEE"
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="1"
                      stopColor="#845EEE"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                {data?.every((d) => d.value === 0) ? (
                  <YAxis
                    interval={0}
                    ticks={tick}
                    domain={[tick?.[0] ?? 0, "dataMax"]}
                    tickFormatter={(value) =>
                      data?.every((d) => d.value === 0) && value === 0
                        ? "0"
                        : value < 0 || value > 0
                          ? " "
                          : `${value}`
                    }
                  />
                ) : (
                  <YAxis
                    interval={0}
                    ticks={tick?.slice(2)}
                    domain={[tick?.[2] ?? 0, "dataMax"]}
                  />
                )}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#888"
                  horizontal
                  vertical
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
                  dataKey="value"
                  stroke="#845EEE"
                  fillOpacity={1}
                  fill="url(#paint0_linear_4549_92819)"
                  baseValue={
                    data?.every((d) => d.value === 0) ? tick?.[0] : tick?.[2]
                  }
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Wrapper>
      </DesktopLayout>
    </>
  );
};
