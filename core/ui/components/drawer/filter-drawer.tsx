import { cn } from "@/core/lib/utils";
import Button from "../button/button";
import {
  BaseDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./base-drawer";
import { Filter } from "lucide-react";
import Typography from "../typography/typography";
import { iconColor } from "@/core/constants/common";

export const FilterDrawer = ({
  variant,
  children,
  onSubmitFilter,
}: {
  variant: "hacker" | "company" | "mediator";
  children: React.ReactNode;
  onSubmitFilter: () => void;
}) => {
  return (
    <BaseDrawer>
      <DrawerTrigger>
        <div
          className={cn(
            "xl:min-w-32",
            "_flexbox__row__center__start gap-2.5 rounded-lg",
            "bg-neutral-light-100 px-3 py-2 dark:bg-neutral-dark-100"
          )}
        >
          <Filter className={iconColor[variant]} width={20} height={20} />
          <Typography variant="p" affects="small">
            Filter
          </Typography>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        <DrawerHeader className="flex flex-col items-start justify-start">
          <DrawerTitle>Filter</DrawerTitle>
        </DrawerHeader>
        <div className="w-full overflow-auto px-6">{children}</div>
        <DrawerFooter>
          <DrawerClose onClick={() => onSubmitFilter()}>
            <Button variant={`primary-${variant}`} fullWidth>
              Apply Filter
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </BaseDrawer>
  );
};
