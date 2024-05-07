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
import { Desktop, Mobile } from "@/core/ui/layout";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { Role } from "@/types/admin/sidebar";
import { Building2, UserRound } from "lucide-react";
import Image from "next/image";

interface I_CardAboutProps {
  isEditing?: boolean;
  variant?: Role;
}

const icons = (variant: Role) => {
  switch (variant) {
    case "hacker":
      return <HackerIcon className="h-8 w-8" />;
    case "company":
      return <Building2 className="h-8 w-8" />;
    case "mediator":
      return <UserRound className="mr-4 h-8 w-8" />;
    default:
      return <HackerIcon className="h-8 w-8" />;
  }
};

const CardAbout = ({ isEditing = false, variant }: I_CardAboutProps) => {
  if (isEditing)
    return (
      <>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5"
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
                  className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
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
            <Input
              type="text"
              label={`${variant} Name`}
              value={"John Doe"}
              containerClassName="capitalize"
            />
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
    <>
      <Mobile>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5",
            "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? "Company Information" : "About You"}
          </Typography>
          <div className="_flexbox__col__start__start gap-6">
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
            </Typography>
            <Avatar
              image="https://api.lorem.space/image/face?w=150&h=150"
              initials="J"
              className="h-12 w-12"
            />
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {`${variant} Name`}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              John Doe
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              Country
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
              About {variant == "company" ? "Company" : "Your Account"}
            </Typography>
            <Typography variant="p" affects="normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5",
            "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? "Company Information" : "About You"}
          </Typography>
          <div className="grid w-full grid-cols-3 items-start gap-6">
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
              </Typography>
              <Avatar
                image="https://api.lorem.space/image/face?w=150&h=150"
                initials="J"
                className="h-12 w-12"
              />
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {`${variant} Name`}
              </Typography>
              <Typography variant="p" affects="normal" className="col-span-1">
                John Doe
              </Typography>
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Country
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
            {variant === "company" && (
              <>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    Company Address
                  </Typography>
                </div>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    State
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    Berlin
                  </Typography>
                </div>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Zip Code
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    000123
                  </Typography>
                </div>
              </>
            )}
          </div>
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              About {variant == "company" ? "Company" : "Your Account"}
            </Typography>
            <Typography variant="p" affects="normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Typography>
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default CardAbout;
