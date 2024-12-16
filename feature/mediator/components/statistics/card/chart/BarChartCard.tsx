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

const data = [
  {
    name: "Jan",
    hacker: 100,
    company: 80,
  },
  {
    name: "Feb",
    hacker: 80,
    company: 60,
  },
  {
    name: "Mar",
    hacker: 60,
    company: 40,
  },
  {
    name: "Apr",
    hacker: 40,
    company: 20,
  },
  {
    name: "May",
    hacker: 80,
    company: 40,
  },
  {
    name: "Jun",
    hacker: 50,
    company: 80,
  },
  {
    name: "Jul",
    hacker: 10,
    company: 60,
  },
  {
    name: "Aug",
    hacker: 80,
    company: 40,
  },
  {
    name: "Sep",
    hacker: 20,
    company: 80,
  },
  {
    name: "Oct",
    hacker: 40,
    company: 20,
  },
  {
    name: "Nov",
    hacker: 80,
    company: 40,
  },
  {
    name: "Dec",
    hacker: 50,
    company: 80,
  },
];

export const BarChartCard = () => {
  return (
    <Wrapper className={cn("gap-3")}>
      <div className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}>
        <Coins className={iconColor.mediator} />
        <Typography variant="p" affects="normal" weight="semibold">
          Open Ticket
        </Typography>
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
