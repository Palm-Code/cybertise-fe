import { currentPhase } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import {
  Avatar,
  Card,
  Indicator,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Role } from "@/types/admin/sidebar";
import { formatDateToAgo2 } from "@/utils/formatter/date-formatter";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface I_VRPHeroCard {
  variant: keyof typeof Role;
  phase: string;
  initialData?: I_GetProgramDetailsSuccessResponse["data"];
}

const VRPHeroCard = ({ variant, phase, initialData }: I_VRPHeroCard) => {
  return (
    <Card className="_flexbox__row__center__between rounded-2xl rounded-b-none xl:px-8 xl:py-6">
      <div className="_flexbox__col__start__start gap-3">
        <div
          className={cn(
            typographyVariants({ variant: "h5", weight: "bold" }),
            "inline-flex items-center gap-5"
          )}
        >
          <Link href="/vrp-launchpad" className="mb-auto mt-1">
            <MoveLeft className="cursor-pointer" />
          </Link>
          <div className="_flexbox__col__start__start gap-3">
            <Tooltip content={initialData?.title || "Create VRP"}>
              <Typography variant="h5" weight={"bold"}>
                {initialData?.title
                  ? initialData?.title?.length > 50
                    ? initialData?.title?.substring(0, 50) + "..."
                    : initialData?.title
                  : "Create VRP"}
              </Typography>
            </Tooltip>
            {variant === "mediator" && (
              <div className="_flexbox__row__start__start gap-6">
                <div className="_flexbox__row__start__start gap-2">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Company:
                  </Typography>
                  <div
                    className={cn(
                      typographyVariants({ variant: "p", affects: "normal" }),
                      "inline-flex gap-2"
                    )}
                  >
                    <Avatar
                      className="h-6 w-6"
                      image={initialData?.company?.logo}
                      initials="C"
                    />
                    {initialData?.company?.name}
                  </div>
                </div>
                <div className="_flexbox__row__start__start gap-2">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Last Update:
                  </Typography>
                  <div
                    className={cn(
                      typographyVariants({ variant: "p", affects: "normal" }),
                      "inline-flex gap-2"
                    )}
                  >
                    {formatDateToAgo2(initialData?.updated_at ?? "")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Indicator
        variant={phase?.toLowerCase().includes("phase") ? "open" : "clear"}
      >
        {`${phase} ${phase?.toLowerCase().includes("phase") ? `: ${currentPhase[phase?.toLowerCase()]}` : ""}`}
      </Indicator>
    </Card>
  );
};
export default VRPHeroCard;
