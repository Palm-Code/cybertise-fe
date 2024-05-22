import { Card, Typography } from "../../components";
import { Skeleton } from "../../components/skeleton/skeleton";

const ScopeCardLoading = () => {
  return (
    <Card className="_flexbox__col__start__start gap-8">
      <Skeleton />
      <div className="_flexbox__col__start__start w-full gap-2">
        <Typography
          variant="p"
          affects="small"
          className="text-neutral-light-30 dark:text-neutral-dark-30"
        >
          Asset Name
        </Typography>
        <Skeleton />
      </div>
      <div className="_flexbox__col__start__start w-full gap-2">
        <Typography
          variant="p"
          affects="small"
          className="text-neutral-light-30 dark:text-neutral-dark-30"
        >
          Last Update
        </Typography>
        <Skeleton className="w-24" />
      </div>
    </Card>
  );
};

const ScopeCardLoadingList = () => {
  return Array(10)
    .fill(0)
    .map((_, index) => <ScopeCardLoading key={index} />);
};

export default ScopeCardLoadingList;
