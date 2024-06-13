"use client";
import { cn } from "@/core/lib/utils";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import { Desktop, Mobile } from "..";
import { Logo } from "../../icons";
import { useGetUserData, usePostLogout } from "@/core/react-query/client";
import HeaderDropdown from "../../components/dropdown/header-dropdown";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { data } = useGetUserData();

  const { mutateAsync } = usePostLogout();

  const handleDropdownClicks = (value: string) => {
    switch (value) {
      case "settings":
        router.push("/settings");
        break;
      case "logout":
        mutateAsync();
        break;
      default:
        break;
    }
  };

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
          <HeaderDropdown
            avatar={data?.avatar}
            options={[
              {
                label: "Settings",
                value: "settings",
                icon: <Settings width={20} height={20} />,
              },
              {
                label: "Logout",
                value: "logout",
                icon: <LogOut width={20} height={20} />,
              },
            ]}
            onValueChange={(v) => handleDropdownClicks(v)}
          />
        </div>
      </Desktop>
    </>
  );
};
export default Header;
