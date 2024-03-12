import { Typography } from "@/core/ui/components";
import CardLogin from "../component/_tabs/_contents/security/CardLoginInfo";
import Authentication from "../component/_tabs/_contents/security/Authecntication";

const Security = () => {
  const menus: { title: string; element: JSX.Element }[] = [
    {
      title: "Login info",
      element: <CardLogin />,
    },
    {
      title: "Two-Factor Authentication",
      element: <Authentication />,
    },
  ];
  return (
    <>
      <div className="_flexbox__row__center__between w-full">
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
    </>
  );
};
export default Security;
