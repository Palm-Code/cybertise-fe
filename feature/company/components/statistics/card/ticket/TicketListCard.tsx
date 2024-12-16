import React from "react";
import { Wrapper } from "../Wrapper";
import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { Coins } from "lucide-react";
import { iconColor } from "@/core/constants/common";
import { StatisticTableView } from "@/feature/company/containers";
import { useGetTableColumns } from "@/feature/company/constants/dashboard";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";

interface TicketListCardProps {
  data?: I_GetChatListSuccessResponse["data"];
}

export const TicketListCard = ({ data }: TicketListCardProps) => {
  const tableColumns = useGetTableColumns();
  return (
    <Wrapper>
      <div className={cn("flex items-center justify-between")}>
        <div
          className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-4")}
        >
          <Coins className={iconColor.company} />
          <Typography variant="p" affects="normal" weight="semibold">
            Open Tickets
          </Typography>
        </div>
        <Button variant="ghost-company">View all</Button>
      </div>
      <StatisticTableView columns={tableColumns} data={data} />
    </Wrapper>
  );
};
