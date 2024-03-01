import { cn } from "@/core/lib/utils";
import { Button, Card, Separator, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VRPHeroCard = () => {
  return (
    <Card>
      <div className="_flexbox__row__start__start w-full gap-9">
        <Image
          src="/images/company-logo/coinbase.png"
          alt="Company Logo"
          width={48}
          height={48}
        />
        <div className="_flexbox__col__start__start w-full gap-12">
          <div className="_flexbox__row__start__between w-full">
            <div className="_flexbox__col__start__start gap-9">
              <div className="_flexbox__col__start__start gap-2">
                <Typography variant="h3" weight="bold">
                  Coinbase
                </Typography>
                <Typography
                  variant="p"
                  affects="small"
                  className="!dark:text-neutral-dark-20 text-neutral-light-20"
                >
                  Company description{" "}
                </Typography>
              </div>
              <Link
                href={"https://linktocompanysite.com"}
                target="_blank"
                className={cn(
                  typographyVariants({ variant: "p", affects: "small" }),
                  "text-neutral-light-20 underline dark:text-neutral-dark-20"
                )}
              >
                https://linktocompanysite.com
              </Link>
            </div>
            <Button variant="primary-hacker" prefixIcon={<Send />}>
              Send Report
            </Button>
          </div>
          <div className="grid h-fit grid-flow-col gap-12">
            <div className="grid h-full gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="!text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Reports resolved
              </Typography>
              <Typography variant="p" affects="small" weight="semibold">
                732
              </Typography>
            </div>
            <Separator orientation="vertical" />
            <div className="grid h-full gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="!text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Bounty Program
              </Typography>
              <Typography variant="p" affects="small" weight="semibold">
                1
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default VRPHeroCard;
