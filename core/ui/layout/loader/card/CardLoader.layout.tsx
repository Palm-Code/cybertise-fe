import { Card } from "@/core/ui/components";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";

const CardLoader = () => {
  return (
    <Card className="_flexbox__col__start gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </Card>
  );
};
export default CardLoader;
