import { Badge, Card, Typography } from "@/core/ui/components";
import CardLogin from "../component/_tabs/_contents/security/CardLoginInfo";
import Authentication from "../component/_tabs/_contents/security/Authecntication";
import { useState } from "react";
import { Role } from "@/types/admin/sidebar";
import { Desktop, Mobile } from "@/core/ui/layout";
import { KeyRound } from "lucide-react";
import { cn } from "@/core/lib/utils";

export interface I_SecurityProps {
  variant: keyof typeof Role;
  isEditing?: boolean;
  handleClickEdit?: (v: boolean) => void;
  twoFactorEnabled?: boolean;
}

const Security = ({
  twoFactorEnabled,
  variant,
  isEditing,
  handleClickEdit = () => {},
}: I_SecurityProps) => {
  const [activeEditElement, setActiveEditElement] = useState(0);

  const menus: { title: string; element: JSX.Element }[] = [
    {
      title: "Login info",
      element: (
        <CardLogin
          variant={variant}
          isEditing={isEditing}
          handleClickEdit={(v) => {
            handleClickEdit(v);
            setActiveEditElement(0);
          }}
        />
      ),
    },
    {
      title: "Two-Factor Authentication",
      element: (
        <Authentication
          twoFactorEnabled={twoFactorEnabled}
          variant={variant}
          isEditing={isEditing}
          handleClickEdit={(v) => {
            handleClickEdit(v);
            setActiveEditElement(1);
          }}
        />
      ),
    },
  ];

  if (isEditing) return menus[activeEditElement].element;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="xl:_flexbox__row__center__between hidden w-full">
            <Typography variant="h5" weight="bold">
              Security
            </Typography>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Typography variant="h6" weight="bold">
              Two-Factor Authentication
            </Typography>

            <Card
              className={cn(
                "_flexbox__col__start__start w-full gap-6 rounded-xl px-4 py-8 xl:gap-3 xl:p-7.5",
                "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
              )}
            >
              <div className="_flexbox__row__start__between w-full">
                <Typography
                  variant="h6"
                  weight="bold"
                  className="xl:inline-flex"
                >
                  <KeyRound className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
                  Authenticator
                </Typography>
                <Badge variant="default">
                  {twoFactorEnabled ? "Connected" : "Not Connected"}
                </Badge>
              </div>
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Authenticator codes help guarantee account security.
              </Typography>
            </Card>
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="xl:_flexbox__row__center__between hidden w-full">
            <Typography variant="h5" weight="bold">
              Security
            </Typography>
          </div>
          {menus.map((menu, idx) => (
            <div
              key={`menu-${idx}`}
              className="_flexbox__col__start__start w-full gap-6"
            >
              <Typography variant="h6" weight="bold">
                {menu.title}
              </Typography>
              {menu.element}
            </div>
          ))}
        </div>
      </Desktop>
    </>
  );
};
export default Security;
