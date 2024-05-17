"use client";
import { cn } from "@/core/lib/utils";
import Avatar from "../../components/avatar/avatar";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import { Desktop, Mobile } from "..";
import { Logo } from "../../icons";
import { useGetUserData, useGetUserProfile } from "@/core/react-query/client";

const Header = () => {
  const { data } = useGetUserData();
  return (
    <>
      <Mobile>
        <div
          className={cn(
            "w-full bg-background-main-light px-6 py-3.5 dark:bg-background-main-dark",
            "_flexbox__row__center gap-8"
          )}
        >
          <Logo className="h-[32px] w-[85px]" />
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "w-full bg-background-main-light px-12 py-6 dark:bg-background-main-dark",
            "_flexbox__row__center__end gap-8"
          )}
        >
          <ThemeSwitcher />
          <Avatar image="https://github.com/shadcn.png" />
        </div>
      </Desktop>
    </>
  );
};
export default Header;
