"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { manageCompanyTabsItemEnums } from "@/enums";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_TabProps {
  items: SortFilterType[];
  active: string;
  updates?: number;
  onValueChange: (value: keyof typeof manageCompanyTabsItemEnums) => void;
}

const Tab = ({ items, active, updates, onValueChange }: I_TabProps) => {
  return (
    <>
      <Mobile>
        <Card className="rounded-none p-6">
          <div className="_flexbox__row__center__start no-scrollbar gap-[42px] overflow-auto">
            {items.map((item) => (
              <Typography
                key={`item.value-${item.value}`}
                variant="p"
                affects="small"
                className={cn(
                  "cursor-pointer whitespace-nowrap text-nowrap border-b-4 border-transparent",
                  "pb-2 font-bold hover:border-sky-normal",
                  active === item.value && "border-sky-normal"
                )}
                onClick={() =>
                  onValueChange(
                    item.value as keyof typeof manageCompanyTabsItemEnums
                  )
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
        <Card className="rounded-2xl rounded-b-none xl:px-8 xl:py-6">
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
                onClick={() =>
                  onValueChange(
                    item.value as keyof typeof manageCompanyTabsItemEnums
                  )
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
