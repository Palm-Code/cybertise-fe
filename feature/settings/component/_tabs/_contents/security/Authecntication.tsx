import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { AtSign, KeyRound } from "lucide-react";

interface I_AuthenticationProps {
  variant: "hacker" | "mediator" | "company";
}

const Authentication = ({ variant }: I_AuthenticationProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6 rounded-xl px-4 py-8 xl:gap-3 xl:p-7.5",
          "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
        )}
      >
        <div className="_flexbox__row__start__between w-full">
          <Typography variant="h6" weight="bold" className="xl:inline-flex">
            <AtSign className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
            Email Verification
          </Typography>
          <Badge variant="default">email***@example.com</Badge>
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Email verification magic link help guarantee your account actiivities
          security.
        </Typography>
        <Button size="ghost" variant={`ghost-${variant}`} className="mt-3">
          Edit
        </Button>
      </Card>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6 rounded-xl px-4 py-8 xl:gap-3 xl:p-7.5",
          "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
        )}
      >
        <div className="_flexbox__row__start__between w-full">
          <Typography variant="h6" weight="bold" className="xl:inline-flex">
            <KeyRound className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
            Authenticator
          </Typography>
          <Badge variant="default">connected</Badge>
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Authenticator codes help guarantee account security.
        </Typography>
        <div className="_flexbox__row__center__start mt-3 gap-6">
          <Button size="ghost" variant={`ghost-${variant}`}>
            Edit
          </Button>
          <Button size="ghost" variant={`ghost-${variant}`}>
            Unbind
          </Button>
          <Button size="ghost" variant={`ghost-${variant}`}>
            Verification
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default Authentication;
