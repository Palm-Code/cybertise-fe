import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { SortFilterType } from "@/types/admin/dashboard";
import { Square } from "lucide-react";

interface I_InformationProps {
  activeStep: number;
  lists: SortFilterType[];
}

const Information = ({ activeStep, lists }: I_InformationProps) => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl",
        "!bg-transparent px-8 py-12"
      )}
    >
      <Typography variant="p" affects="extralarge" weight="bold">
        Information
      </Typography>
      <div className="_flexbox__col__start__start gap-5">
        {lists.map((info, index) => (
          <div
            className="grid grid-flow-col gap-3"
            key={`send-report-${index}`}
          >
            <Square
              width={20}
              height={20}
              className={cn(
                "text-transparent",
                activeStep <= index
                  ? "fill-neutral-light-50 dark:fill-neutral-dark-50"
                  : "fill-lime-normal-light dark:fill-lime-normal-dark"
              )}
            />
            <Typography key={index} variant="p" affects="small">
              {info.label}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default Information;
