"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
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
    <>
      <Mobile className="sticky top-10 z-50">
        <Card className="rounded-none px-8 py-6 pt-9 xl:rounded-2xl xl:rounded-b-none">
          <div className="grid w-full grid-flow-col gap-[42px] overflow-x-auto md:w-fit xl:w-fit">
            {items.map((item) => (
              <Typography
                key={`item.value-${item.value}`}
                variant="p"
                affects="small"
                className={cn(
                  "whitespace-nowrap text-nowrap",
                  "cursor-pointer border-b-4 font-bold hover:border-lime-normal-light dark:hover:border-lime-normal-dark",
                  active === item.value
                    ? "border-lime-normal-light dark:border-lime-normal-dark"
                    : "border-transparent"
                )}
                onClick={() =>
                  onValueChange(item.value as keyof typeof TabsItem)
                }
              >
                {item.label}{" "}
                {item.value === "updates" && updates! > 0 && `(${updates})`}
              </Typography>
            ))}
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card className="rounded-none px-8 py-6 pt-9 xl:rounded-2xl xl:rounded-b-none">
          <div className="grid w-full grid-flow-col gap-[42px] overflow-x-auto xl:w-fit">
            {items.map((item) => (
              <Typography
                key={`item.value-${item.value}`}
                variant="p"
                affects="small"
                className={cn(
                  "whitespace-nowrap text-nowrap",
                  "cursor-pointer border-b-4 font-bold hover:border-lime-normal-light dark:hover:border-lime-normal-dark",
                  active === item.value
                    ? "border-lime-normal-light dark:border-lime-normal-dark"
                    : "border-transparent"
                )}
                onClick={() =>
                  onValueChange(item.value as keyof typeof TabsItem)
                }
              >
                {item.label}{" "}
                {item.value === "updates" && updates! > 0 && `(${updates})`}
              </Typography>
            ))}
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default Tab;
