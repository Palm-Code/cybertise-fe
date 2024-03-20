import { cn } from "@/core/lib/utils";
import { Card, Indicator, Separator, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { MoveLeft, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface I_VRPHeroCard {}

const VRPHeroCard = ({}: I_VRPHeroCard) => {
  return (
    <Card className="_flexbox__row__center__between rounded-2xl rounded-b-none px-8 py-6">
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
            <Typography variant="h5" weight="bold">
              Create New VRP
            </Typography>
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
                  <Image
                    width={24}
                    height={24}
                    src="/images/company-logo/coinbase.png"
                    alt="logo"
                  />
                  Coinbase
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
                  2 days ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Indicator variant="clear">Published</Indicator>
    </Card>
  );
};
export default VRPHeroCard;
