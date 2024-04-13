import { Typography } from "@/core/ui/components";
import CardLogin from "../component/_tabs/_contents/security/CardLoginInfo";
import Authentication from "../component/_tabs/_contents/security/Authecntication";

interface I_SecurityProps {
  variant: "hacker" | "mediator" | "company";
}

const Security = ({ variant }: I_SecurityProps) => {
  const menus: { title: string; element: JSX.Element }[] = [
    {
      title: "Login info",
      element: <CardLogin variant={variant} />,
    },
    {
      title: "Two-Factor Authentication",
      element: <Authentication variant={variant} />,
    },
  ];
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
