"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_TabProps {
  items: SortFilterType[];
  active: string;
  onValueChange: (value: string) => void;
}

const Tab = ({ items, active, onValueChange }: I_TabProps) => {
  return (
    <Card className="rounded-2xl rounded-b-none px-8 py-6 pt-9">
      <div className="grid w-fit grid-flow-col gap-[42px]">
        {items.map((item) => (
          <Typography
            key={item.value}
            variant="p"
            affects="small"
            className={cn(
              "cursor-pointer border-b-4 border-transparent font-bold hover:border-lime-normal",
              active === item.value && "border-lime-normal"
            )}
            onClick={() => onValueChange(item.value)}
          >
            {item.label}
          </Typography>
        ))}
      </div>
    </Card>
  );
};
export default Tab;
