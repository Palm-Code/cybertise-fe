import { cn } from "@/core/lib/utils";
import { Avatar, Card, Typography } from "@/core/ui/components";
import HackerIcon from "@/core/ui/icons/hacker/Hacker.icon";
import Image from "next/image";

const menus: string[] = ["Avatars", "Hacker Name", "Country"];

interface I_MenuProps {
  name: string;
  image: string;
  country: {
    name: string;
    flag: string;
  };
  initials: string;
  about: string;
}

const CardAbout = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <Typography variant="h6" weight="bold" className="inline-flex">
        <HackerIcon className="mr-4 h-8 w-8" />
        About You
      </Typography>
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
        {menus.map((menu) => (
          <Typography
            key={`menu-${menu}`}
            variant="p"
            affects="normal"
            className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {menu}
          </Typography>
        ))}
        <Avatar
          image="https://api.lorem.space/image/face?w=150&h=150"
          initials="J"
          className="h-12 w-12"
        />
        <Typography variant="p" affects="normal" className="col-span-1">
          John Doe
        </Typography>
        <div className="_flexbox__row__center__start gap-2.5">
          <Image
            src="/images/flags/germany.svg"
            alt="flag"
            width={20}
            height={20}
          />
          <Typography variant="p" affects="normal" className="col-span-1">
            Germany
          </Typography>
        </div>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          About Your Account
        </Typography>
        <Typography variant="p" affects="normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Typography>
      </div>
    </Card>
  );
};
export default CardAbout;
