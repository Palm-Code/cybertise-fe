import { cn } from "@/core/lib/utils";
import { Card } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { X } from "lucide-react";
import IndicatorSteps from "./_indicator/Indicator.steps";
import Link from "next/link";
import Setup from "./stages/setup-phase/Setup.stages";

interface I_CreateVrpLaunchpadProps {
  id: string;
  variant: "mediator" | "company";
}

const CreateVrpLaunchpad = ({ id, variant }: I_CreateVrpLaunchpadProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "_flexbox__col__start__start sticky top-0 z-30",
          "h-fit w-full gap-3 bg-background-page-light dark:bg-background-page-dark"
        )}
      >
        <Card className="rounded-2xl rounded-b-none px-8 py-6">
          <div
            className={cn(
              typographyVariants({ variant: "h5", weight: "bold" }),
              "inline-flex items-center gap-5"
            )}
          >
            <Link href="/vrp-launchpad">
              <X className="cursor-pointer" />
            </Link>
            Create New VRP
          </div>
        </Card>
        <IndicatorSteps currentSteps={2} variant="mediator" />
        <Setup id={id} variant={variant} />
      </div>
    </div>
  );
};
export default CreateVrpLaunchpad;
