"use client";
import { borderColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { SettingItems } from "@/enums";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_TabProps {
  items: SortFilterType[];
  active: SettingItems;
  onValueChange: (value: SettingItems) => void;
  variant: "hacker" | "mediator" | "company";
}

const Tab = ({ items, active, variant, onValueChange }: I_TabProps) => {
  return (
    <Card className="rounded-2xl rounded-b-none pt-9 xl:py-6">
      <div className="grid w-fit grid-flow-col gap-[42px]">
        {items.map((item) => (
          <Typography
            key={`tab-${item.value}`}
            variant="p"
            affects="small"
            className={cn(
              "cursor-pointer border-b-4 font-bold",
              borderColor[variant],
              active === item.value
                ? borderColor[variant]
                : "border-transparent dark:border-transparent"
            )}
            onClick={() => onValueChange(item.value as SettingItems)}
          >
            {item.label}{" "}
          </Typography>
        ))}
      </div>
    </Card>
  );
};
export default Tab;
