import { Button, Card, Typography } from "@/core/ui/components";
import CardLogin from "../component/_tabs/_contents/security/CardLoginInfo";
import Authentication from "../component/_tabs/_contents/security/Authecntication";
import { Desktop } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export interface I_SecurityProps {
  variant: "hacker" | "mediator" | "company";
  isEditing?: boolean;
  handleClickEdit?: (v: boolean) => void;
}

const Security = ({
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
  );
};
export default Security;
