import React from "react";
import { Wrapper } from "../Wrapper";
import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { Coins } from "lucide-react";
import { iconColor } from "@/core/constants/common";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { StatisticTableView } from "@/feature/hacker/containers";
import { useGetTableColumns } from "@/feature/hacker/constants/dashboard";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

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
          <Coins className={iconColor.hacker} />
          <Typography
            variant="p"
            affects="normal"
            weight="semibold"
          >
            Open Tickets
          </Typography>
        </div>
        <Button
          variant="ghost-hacker"
          asLink
          href="/reports"
        >
          View all
        </Button>
      </div>
      {data?.length === 0 ? (
        <EmptyState
          type="ticket"
          variant="hacker"
          className={cn("mt-0")}
        />
      ) : (
        <StatisticTableView
          columns={tableColumns}
          data={data}
        />
      )}
    </Wrapper>
  );
};
