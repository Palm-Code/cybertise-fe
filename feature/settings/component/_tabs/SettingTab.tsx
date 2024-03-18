"use client";
import { borderColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { SettingItems } from "@/enums";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_TabProps {
  items: SortFilterType[];
  active: string;
  onValueChange: (value: keyof typeof SettingItems) => void;
  variant: "hacker" | "mediator" | "company";
}

const Tab = ({ items, active, variant, onValueChange }: I_TabProps) => {
  return (
    <Card className="rounded-2xl rounded-b-none px-8 py-6 pt-9">
      <div className="grid w-fit grid-flow-col gap-[42px]">
        {items.map((item) => (
          <Typography
            key={item.value}
            variant="p"
            affects="small"
            className={cn(
              "cursor-pointer border-b-4 border-transparent font-bold",
              `hover:${borderColor[variant]}`,
              active === item.value && borderColor[variant]
            )}
            onClick={() =>
              onValueChange(item.value as keyof typeof SettingItems)
            }
          >
            {item.label}{" "}
          </Typography>
        ))}
      </div>
    </Card>
  );
};
export default Tab;
