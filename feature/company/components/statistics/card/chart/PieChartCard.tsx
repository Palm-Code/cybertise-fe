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
} from "recharts";
import { I_GetAnalyticsResponse } from "@/core/models/common/analytics";
import { useTranslations } from "next-intl";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";

const colorKeys: Record<string, string> = {
  critical_risk: "#E60202",
  high_risk: "#FF5151",
  medium_risk: "#F5891D",
  low_risk: "#F0F00A",
  no_risk: "#D9D9D9",
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
      className={cn(percent === 0 ? "opacity-0" : "")}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type DoughnutCartPropsType = {
  data: I_GetAnalyticsResponse["overall_risk_reported"];
};

export const PieChartCard = ({ data }: DoughnutCartPropsType) => {
  const t = useTranslations("DashboardCompany");
  return (
    <>
      <MobileLayout>
        <div
          className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
        >
          <Coins className={iconColor.hacker} />
          <Typography variant="p" affects="normal" weight="semibold">
            {t("pieChart.title")}
          </Typography>
        </div>
        <div className="mx-auto hidden h-[300px] w-full max-w-sm md:block">
          <ResponsiveContainer width="100%" height="100%">
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
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={8}
                labelLine={false}
                label={renderCustomizedLabel}
                className={cn("!outline-none")}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorKeys[entry.color_key]}
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
          <ResponsiveContainer width="100%" height="100%">
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
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={8}
                labelLine={false}
                label={renderCustomizedLabel}
                className={cn("!outline-none")}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorKeys[entry.color_key]}
                    stroke={entry.color_key}
                    strokeWidth={2}
                    className={cn("!outline-none")}
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
            <Coins className={iconColor.hacker} />
            <Typography variant="p" affects="normal" weight="semibold">
              {t("pieChart.title")}
            </Typography>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
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
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  dataKey="value"
                  cornerRadius={8}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  className={cn("!outline-none")}
                  animationEasing="ease-in-out"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colorKeys[entry.color_key]}
                      stroke={entry.color_key}
                      strokeWidth={2}
                      className={cn("!outline-none")}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Wrapper>
      </DesktopLayout>
    </>
  );
};
