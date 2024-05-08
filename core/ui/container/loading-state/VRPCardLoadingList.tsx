import { cn } from "@/core/lib/utils";
import { Card, Separator, Typography } from "@/core/ui/components";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";

interface I_VRPCardProps {
  isGridCard?: boolean;
}

const VRPCard = ({ isGridCard }: I_VRPCardProps) => {
  return (
    <>
      <Mobile>
        <Card>
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full", "gap-8")}>
              <div className="_flexbox__row__center__between w-full gap-4">
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
            <div className={cn("_flexbox__col__start", "w-full gap-8")}>
              <div className="_flexbox__row__start__between w-full gap-4">
                <div className="_flexbox__col__start w-full max-w-xl gap-1">
                  <Skeleton />
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

const VRPCardLoadingList = ({ isGridCard }: I_VRPCardProps) => {
  return Array(10)
    .fill(0)
    .map((_, index) => <VRPCard key={index} isGridCard={isGridCard} />);
};

export default VRPCardLoadingList;
