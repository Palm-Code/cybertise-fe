import React, { useState } from "react";
import { Wrapper } from "../Wrapper";
import { cn } from "@/core/lib/utils";
import { Coins } from "lucide-react";
import { iconColor } from "@/core/constants/common";
import { Typography } from "@/core/ui/components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { I_GetAnalyticsResponse } from "@/core/models/common/analytics";
import { useTranslations } from "next-intl";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";

export const COLORS = [
  { start: "#CC0000", end: "#FFF" },
  { start: "#FF0000", end: "#FFF" },
  { start: "#F5891D", end: "#FFF" },
  { start: "#F0F00A", end: "#FFF" },
  { start: "#D9D9D9", end: "#FFF" },
];

export const CustomTooltip = ({ payload }: any) => {
  if (payload && payload.length) {
    return (
      <div
        className={cn(
          "rounded-md bg-neutral-light-80 px-2.5 py-2 dark:bg-neutral-dark-80",
          "border border-neutral-light-60 dark:border-white",
          "flex flex-col items-center gap-1"
        )}
      >
        <p className="text-[10px]">{`${payload[0].name}`}</p>
        <p className="text-[10px]">{`${payload[0].value} of ${payload[0].payload.totalData}`}</p>
      </div>
    );
  }

  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  if (
    typeof cx !== "number" ||
    typeof cy !== "number" ||
    typeof innerRadius !== "number" ||
    typeof outerRadius !== "number" ||
    typeof percent !== "number"
  ) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
      color="#000"
      className={cn(
        "!stroke-none text-[8px] !text-black hover:!stroke-none md:text-xs",
        percent === 0 ? "opacity-0" : ""
      )}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type DoughnutCartPropsType = {
  data: I_GetAnalyticsResponse["overall_risk_reported"];
};

export const PieChartCard = ({ data }: DoughnutCartPropsType) => {
  const t = useTranslations("DashboardHacker");

  const customData = data.map((entry) => ({
    name: entry.name,
    value: entry.value,
    totalData: data.reduce((acc, curr) => acc + curr.value, 0),
    color_key: entry.color_key,
  }));
  return (
    <>
      <MobileLayout>
        <div
          className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
        >
          <Coins className={iconColor.mediator} />
          <Typography
            variant="p"
            affects="normal"
            weight="semibold"
          >
            {t("pieChart.title")}
          </Typography>
        </div>
        <div className="mx-auto hidden h-[300px] w-full max-w-sm md:block">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                iconType="circle"
                formatter={(value: string) => (
                  <Typography
                    variant="p"
                    affects="tiny"
                    className={cn(
                      "!text-[8px] text-neutral-dark-90 dark:text-white"
                    )}
                  >
                    {value}
                  </Typography>
                )}
              />
              <defs>
                {data.map((_, index) => (
                  <linearGradient
                    className="rotate-[120deg] drop-shadow-pie-chart"
                    key={`myGradient${index}`}
                    id={`myGradient${index}`}
                  >
                    <stop
                      offset="1.96%"
                      stopColor={COLORS[index % COLORS.length].start}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLORS[index % COLORS.length].end}
                    />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={customData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={8}
                labelLine={false}
                label={renderCustomizedLabel}
                className={cn(
                  "stroke-none !outline-none drop-shadow-pie-chart hover:cursor-pointer hover:stroke-white"
                )}
                animationEasing="ease-in-out"
              >
                {customData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#myGradient${index})`}
                    stroke={entry.color_key}
                    strokeWidth={2}
                    className={cn("!outline-none")}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mx-auto h-[300px] w-full max-w-sm md:hidden">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="middle"
                iconType="circle"
                formatter={(value: string) => (
                  <Typography
                    variant="p"
                    affects="tiny"
                    className={cn(
                      "!text-[8px] text-neutral-dark-90 dark:text-white"
                    )}
                  >
                    {value}
                  </Typography>
                )}
              />
              <defs>
                {data.map((_, index) => (
                  <linearGradient
                    className="rotate-[120deg] drop-shadow-pie-chart"
                    key={`myGradient${index}`}
                    id={`myGradient${index}`}
                  >
                    <stop
                      offset="1.96%"
                      stopColor={COLORS[index % COLORS.length].start}
                    />
                    <stop
                      offset="100%"
                      stopColor={COLORS[index % COLORS.length].end}
                    />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={customData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={8}
                labelLine={false}
                label={renderCustomizedLabel}
                className={cn(
                  "stroke-none !outline-none drop-shadow-pie-chart hover:cursor-pointer hover:stroke-white"
                )}
                animationEasing="ease-in-out"
              >
                {customData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#myGradient${index})`}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </MobileLayout>
      <DesktopLayout>
        <Wrapper className={cn("gap-3")}>
          <div
            className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
          >
            <Coins className={iconColor.mediator} />
            <Typography
              variant="p"
              affects="normal"
              weight="semibold"
            >
              {t("pieChart.title")}
            </Typography>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Legend
                  layout="vertical"
                  align="left"
                  verticalAlign="middle"
                  iconType="circle"
                  className={cn(
                    "grid grid-cols-[auto_1fr] items-center gap-1 space-y-4"
                  )}
                  formatter={(value: string) => (
                    <Typography
                      variant="p"
                      affects="tiny"
                      className={cn("text-neutral-dark-90 dark:text-white")}
                    >
                      {value}
                    </Typography>
                  )}
                />
                <defs>
                  {data.map((_, index) => (
                    <linearGradient
                      className="rotate-[120deg] drop-shadow-pie-chart"
                      key={`myGradient${index}`}
                      id={`myGradient${index}`}
                    >
                      <stop
                        offset="1.96%"
                        stopColor={COLORS[index % COLORS.length].start}
                      />
                      <stop
                        offset="100%"
                        stopColor={COLORS[index % COLORS.length].end}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={customData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  cornerRadius={8}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  className={cn(
                    "stroke-none !outline-none drop-shadow-pie-chart hover:cursor-pointer hover:stroke-white"
                  )}
                  animationEasing="ease-in-out"
                >
                  {customData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#myGradient${index})`}
                    />
                  ))}
                </Pie>
                <Tooltip
                  animationEasing="ease-in-out"
                  content={
                    <CustomTooltip
                      payload={data.reduce((acc, curr) => acc + curr.value, 0)}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Wrapper>
      </DesktopLayout>
    </>
  );
};
