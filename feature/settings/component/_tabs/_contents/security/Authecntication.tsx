import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { AtSign, KeyRound } from "lucide-react";

const Authentication = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-3 rounded-xl p-7.5",
          "bg-neutral-light-100 dark:bg-neutral-dark-100"
        )}
      >
        <div className="_flexbox__row__start__between w-full">
          <Typography variant="h6" weight="bold" className="inline-flex">
            <AtSign className="mr-4 h-8 w-8" />
            Email Verification
          </Typography>
          <Badge variant="hacker">email***@example.com</Badge>
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Email verification magic link help guarantee your account actiivities
          security.
        </Typography>
        <Button size="ghost" variant="ghost-hacker" className="mt-3">
          Edit
        </Button>
      </Card>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-3 rounded-xl p-7.5",
          "bg-neutral-light-100 dark:bg-neutral-dark-100"
        )}
      >
        <div className="_flexbox__row__start__between w-full">
          <Typography variant="h6" weight="bold" className="inline-flex">
            <KeyRound className="mr-4 h-8 w-8" />
            Authenticator
          </Typography>
          <Badge variant="hacker">connected</Badge>
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Authenticator codes help guarantee account security.
        </Typography>
        <div className="_flexbox__row__center__start mt-3 gap-6">
          <Button size="ghost" variant="ghost-hacker">
            Edit
          </Button>
          <Button size="ghost" variant="ghost-hacker">
            Unbind
          </Button>
          <Button size="ghost" variant="ghost-hacker">
            Verification
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Authentication;
