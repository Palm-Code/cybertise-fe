import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { Desktop } from "@/core/ui/layout";
import { I_SecurityProps } from "@/feature/settings/containers/Security.container";
import { RectangleEllipsis, X } from "lucide-react";
import CardEditPassword from "./CardEditPassword";

interface I_CardLoginInfoProps extends I_SecurityProps {}

const CardLoginInfo = ({
  variant,
  isEditing,
  handleClickEdit = () => {},
}: I_CardLoginInfoProps) => {
  if (isEditing)
    return (
      <>
        <Desktop>
          <div className="_flexbox__col__start__start gap-6">
            <Card
              className={cn(
                "rounded-2xl rounded-b-none xl:px-8 xl:py-6",
                "_flexbox__row__center__between w-full"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <Button
                  variant={`tertiary-${variant}`}
                  prefixIcon={<X />}
                  className="p-0"
                  onClick={() => handleClickEdit(false)}
                />
                <Typography variant="h5" weight="bold" className="capitalize">
                  Change Login Password
                </Typography>
              </div>
              <div className="_flexbox__row__center__start gap-6">
                <Button
                  variant={`tertiary-${variant}`}
                  onClick={() => handleClickEdit(false)}
                >
                  Discard
                </Button>
                <Button variant={`primary-${variant}`} onClick={() => {}}>
                  Save Changes
                </Button>
              </div>
            </Card>
            <CardEditPassword />
          </div>
        </Desktop>
      </>
    );

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
      <Button
        size="ghost"
        variant={`ghost-${variant}`}
        className="mt-3"
        onClick={() => handleClickEdit(true)}
      >
        Change Password
      </Button>
    </Card>
  );
};
export default CardLoginInfo;
