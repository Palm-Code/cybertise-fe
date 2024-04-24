import { cn } from "@/core/lib/utils";
import { Card, Separator, Typography } from "@/core/ui/components";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";
import { Desktop, Mobile } from "@/core/ui/layout";

interface I_TicketCardProps {
  isGridCard?: boolean;
}

const TicketCard = ({ isGridCard }: I_TicketCardProps) => {
  return (
    <>
      <Mobile>
        <Card>
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full", "gap-8")}>
              <Skeleton className="h-7 w-19 rounded-full" />
              <div className="_flexbox__row__center__between w-full gap-4">
                <div className="relative aspect-square w-19 overflow-hidden rounded-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="_flexbox__col__start w-full max-w-xl gap-1">
                  <Skeleton className="h-7" />
                </div>
                <Skeleton className="h-7 w-24" />
              </div>
              <Separator orientation="horizontal" />
              <div className="_flexbox__row__center__between w-full">
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Asset type available
                  </Typography>
                  <div
                    className={cn("flex w-full flex-wrap items-center gap-4")}
                  >
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card>
          <div className="_flexbox__row__start__start w-full gap-9">
            {!isGridCard && (
              <div className="relative aspect-square w-12 overflow-hidden rounded-full">
                <Skeleton className="h-full w-full" />
              </div>
            )}
            <div
              className={cn(
                "_flexbox__col__start",
                isGridCard ? "w-full gap-8" : "w-[calc(100%-84px)] gap-12"
              )}
            >
              <div className="_flexbox__row__start__between w-full gap-4">
                {isGridCard && (
                  <div className="relative aspect-square w-19 overflow-hidden rounded-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}
                <div className="_flexbox__col__start w-full max-w-xl gap-1">
                  <Skeleton />
                  <div className="_flexbox__row__center gap-4">
                    <Skeleton className="h-8 w-19 rounded-full" />
                  </div>
                </div>
                <Skeleton className="w-24" />
              </div>
              <div className="_flexbox__row__center__between w-full">
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Asset type available
                  </Typography>
                  <div
                    className={cn("flex w-full flex-wrap items-center gap-4")}
                  >
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};

const ProgramsTicketCardLoadingList = ({ isGridCard }: I_TicketCardProps) => {
  return Array(4)
    .fill(0)
    .map((_, index) => <TicketCard key={index} isGridCard={isGridCard} />);
};

export default ProgramsTicketCardLoadingList;
