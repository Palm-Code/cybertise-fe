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

const data = [
  { name: "Low risk (34%)", value: 34, color: "#F0F00A" },
  { name: "Medium Risk (13%)", value: 13, color: "#F5891D" },
  { name: "High Risk (28%)", value: 28, color: "#FF5151" },
  { name: "Critical Risk (8%)", value: 8, color: "#E60202" },
  { name: "Not scoring bug (17%)", value: 17, color: "#D9D9D9" },
];

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
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartCard = () => {
  return (
    <Wrapper className={cn("gap-3")}>
      <div className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}>
        <Coins className={iconColor.company} />
        <Typography variant="p" affects="normal" weight="semibold">
          Overal Risks Reported
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
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                  className={cn("!outline-none")}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};
