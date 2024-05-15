import { cn } from "@/core/lib/utils";
import { Button, Card, Separator, Typography } from "../../components";
import { Skeleton } from "../../components/skeleton/skeleton";
import { Desktop, Mobile } from "../../layout";
import { Send } from "lucide-react";

const VRPHeroLoading = ({
  variant = "hacker",
}: {
  variant?: "company" | "mediator" | "hacker";
}) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:gap-10 xl:pb-28 xl:pt-12">
      <Mobile>
        <Card
          className={cn(
            "rounded-none px-6 py-2 transition-opacity duration-100"
          )}
        >
          <div className="_flexbox__col__start__start w-full gap-4">
            <div className="_flexbox__row__center__between w-full gap-9">
              <div className="_flexbox__col__start__start w-1/2 gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__col__start__start w-full gap-2">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Reports Resolved
              </Typography>
              <Skeleton />
            </div>
            <div className="_flexbox__col__start__start w-full gap-2">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Bounty Program
              </Typography>
              <Skeleton />
            </div>
            <div className="_flexbox__col__start__start mb-4 w-full gap-2">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Company Website
              </Typography>
              <Skeleton />
            </div>
            {variant === "hacker" && (
              <Button
                variant="primary-hacker"
                fullWidth
                prefixIcon={<Send />}
                disabled
              >
                Send Report
              </Button>
            )}
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card>
          <div className="_flexbox__row__start__start w-full gap-9">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="_flexbox__col__start__start w-full gap-12">
              <div className="_flexbox__row__start__between w-full">
                <div className="_flexbox__col__start__start w-1/2 gap-9">
                  <div className="_flexbox__col__start__start w-full gap-2">
                    <Skeleton />
                    <Skeleton />
                  </div>
                </div>
                {variant === "hacker" && (
                  <Button
                    variant="primary-hacker"
                    prefixIcon={<Send />}
                    disabled
                  >
                    Send Report
                  </Button>
                )}
              </div>
              <div className="grid h-fit max-h-12 grid-flow-col gap-12">
                <div className="grid h-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Reports resolved
                  </Typography>
                  <Skeleton />
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
                  <Skeleton />
                </div>
                <Separator orientation="vertical" />
                <div className="grid h-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Company Website
                  </Typography>
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </div>
  );
};
export default VRPHeroLoading;
