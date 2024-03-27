"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { TabsItem } from "@/enums";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_TabProps {
  items: SortFilterType[];
  active: string;
  updates?: number;
  onValueChange: (value: keyof typeof TabsItem) => void;
}

const Tab = ({ items, active, updates, onValueChange }: I_TabProps) => {
  return (
    <Card className="rounded-2xl rounded-b-none px-8 py-6 pt-9">
      <div className="grid w-fit grid-flow-col gap-[42px]">
        {items.map((item) => (
          <Typography
            key={`item.value-${item.value}`}
            variant="p"
            affects="small"
            className={cn(
              "cursor-pointer border-b-4 border-transparent font-bold hover:border-sky-normal",
              active === item.value && "border-sky-normal"
            )}
            onClick={() => onValueChange(item.value as keyof typeof TabsItem)}
          >
            {item.label}{" "}
            {item.value === "updates" && updates! > 0 && `(${updates})`}
          </Typography>
        ))}
      </div>
    </Card>
  );
};
export default Tab;
