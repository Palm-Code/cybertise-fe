import { cn } from "@/core/lib/utils";
import { Badge, Card, Typography } from "@/core/ui/components";
import { UserRound } from "lucide-react";

const menus: string[] = ["Your Email", "Your Website", "Phone"];

const CardAccountDetails = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <Typography variant="h6" weight="bold" className="inline-flex">
        <UserRound className="mr-4 h-8 w-8" />
        Account Details
      </Typography>
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
        {menus.map((menu) => (
          <Typography
            key={menu}
            variant="p"
            affects="normal"
            className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {menu}
          </Typography>
        ))}
        <div className="_flexbox__row__center__start gap-2.5">
          <Typography variant="p" affects="normal" className="col-span-1">
            email@example.com
          </Typography>
          <Badge variant="default">verified</Badge>
        </div>
        <div className="_flexbox__row__center__start gap-2.5">
          <Typography variant="p" affects="normal" className="col-span-1">
            wwww.example.com
          </Typography>
          <Badge variant="default">verified</Badge>
        </div>
        <div className="_flexbox__row__center__start gap-2.5">
          <Typography variant="p" affects="normal" className="col-span-1">
            +1 123 456 789
          </Typography>
          <Badge variant="default">verified</Badge>
        </div>
      </div>
    </Card>
  );
};
export default CardAccountDetails;
