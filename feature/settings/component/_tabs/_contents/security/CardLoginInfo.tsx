import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { RectangleEllipsis } from "lucide-react";

interface I_CardLoginInfoProps {
  variant: "hacker" | "mediator" | "company";
}

const CardLoginInfo = ({ variant }: I_CardLoginInfoProps) => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl px-6 py-8 xl:gap-3 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="xl:inline-flex">
          <RectangleEllipsis className="mb-4 h-8 w-8 xl:mr-4" />
          Login password
        </Typography>
        <Badge variant="default">Verified</Badge>
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        The login password helps guarantee account and communication security.
      </Typography>
      <Button size="ghost" variant={`ghost-${variant}`} className="mt-3">
        Change Password
      </Button>
    </Card>
  );
};
export default CardLoginInfo;
