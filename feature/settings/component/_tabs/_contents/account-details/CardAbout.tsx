import { cn } from "@/core/lib/utils";
import {
  Avatar,
  Button,
  Card,
  Input,
  SelectDropdown,
  TextArea,
  Typography,
} from "@/core/ui/components";
import HackerIcon from "@/core/ui/icons/hacker/Hacker.icon";
import { AnimationWrapper } from "@/core/ui/layout";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { Role } from "@/types/admin/sidebar";
import Image from "next/image";

const menus: string[] = ["Avatars", "Hacker Name", "Country"];

interface I_CardAboutProps {
  isEditing?: boolean;
  variant?: Role;
}

const CardAbout = ({ isEditing = false, variant }: I_CardAboutProps) => {
  if (isEditing)
    return (
      <>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl p-7.5"
          )}
        >
          <Typography variant="h6" weight="bold" className="inline-flex">
            <HackerIcon className="mr-4 h-8 w-8" />
            About You
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {menus[0]}
                </Typography>
                <Avatar
                  image="https://api.lorem.space/image/face?w=150&h=150"
                  initials="J"
                  className="h-12 w-12"
                />
              </div>
              <Button variant={`tertiary-${variant as Role}`}>
                Change Avatar
              </Button>
            </div>
            <Input type="text" label={menus[1]} value={"John Doe"} />
            <SelectDropdown
              label="Country"
              value={"us"}
              withIcon
              withSearch
              options={countryOptions}
              onValueChange={(v) => {}}
            />
          </div>
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              About Your Account
            </Typography>
            <TextArea
              label={`About ${variant}`}
              value={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            />
          </div>
        </Card>
      </>
    );

  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-8 rounded-xl p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <Typography variant="h6" weight="bold" className="inline-flex">
        <HackerIcon className="mr-4 h-8 w-8" />
        About You
      </Typography>
      <div className="_flexbox__col__start__start gap-6">
        <Typography
          variant="p"
          affects="normal"
          className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {menus[0]}
        </Typography>
        <Avatar
          image="https://api.lorem.space/image/face?w=150&h=150"
          initials="J"
          className="h-12 w-12"
        />
        <Typography
          variant="p"
          affects="normal"
          className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {menus[1]}
        </Typography>
        <Typography variant="p" affects="normal" className="col-span-1">
          John Doe
        </Typography>
        <Typography
          variant="p"
          affects="normal"
          className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {menus[2]}
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
