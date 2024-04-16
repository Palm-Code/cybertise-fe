import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { Desktop } from "@/core/ui/layout";
import { I_SecurityProps } from "@/feature/settings/containers/Security.container";
import { AtSign, KeyRound, X } from "lucide-react";
import { useState } from "react";
import CardEditEmail from "./CardEditEmail";

interface I_AuthenticationProps extends I_SecurityProps {}

const Authentication = ({
  variant,
  isEditing,
  handleClickEdit = () => {},
}: I_AuthenticationProps) => {
  const [activeEditElement, setActiveEditElement] = useState(0);

  const menus: { title: string; element: JSX.Element }[] = [
    {
      title: "Change Email Verification",
      element: <CardEditEmail />,
    },
    {
      title: "Two-Factor Authentication",
      element: <></>,
    },
  ];

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
                  {menus[activeEditElement].title}
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
            {menus[activeEditElement].element}
          </div>
        </Desktop>
      </>
    );

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
        <Button
          size="ghost"
          variant={`ghost-${variant}`}
          className="mt-3"
          onClick={() => {
            handleClickEdit(true);
            setActiveEditElement(0);
          }}
        >
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
          <Button
            size="ghost"
            variant={`ghost-${variant}`}
            onClick={() => handleClickEdit(true)}
          >
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
