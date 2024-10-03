"use client";
import { cn } from "@/core/lib/utils";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import { Logo } from "../../icons";
import { useGetUserData, usePostLogout } from "@/core/react-query/client";
import HeaderDropdown from "../../components/dropdown/header-dropdown";
import { LogOut, Settings } from "lucide-react";
import { Skeleton } from "../../components/skeleton/skeleton";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Sidebar");
  const { data, isLoading } = useGetUserData();

  const { mutateAsync } = usePostLogout();

  const handleDropdownClicks = (value: string) => {
    switch (value) {
      case "settings":
        return null;
      case "logout":
        mutateAsync();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="w-full xl:hidden">
        <div
          className={cn(
            "w-full bg-background-main-light px-6 py-3.5 dark:bg-background-main-dark",
            "_flexbox__row__center gap-8"
          )}
        >
          <Link href="/dashboard">
            <Logo className="h-[32px] w-[85px]" />
          </Link>
        </div>
      </div>
      <div className="hidden w-full xl:block">
        <div
          className={cn(
            "w-full bg-background-main-light px-12 py-6 dark:bg-background-main-dark",
            "_flexbox__row__center__end gap-8"
          )}
        >
          <ThemeSwitcher />
          {!isLoading ? (
            <HeaderDropdown
              avatar={data?.avatar}
              options={[
                {
                  label: t("settings"),
                  value: "settings",
                  icon: <Settings width={20} height={20} />,
                },
                {
                  label: t("logout"),
                  value: "logout",
                  icon: <LogOut width={20} height={20} />,
                },
              ]}
              onValueChange={(v) => handleDropdownClicks(v)}
            />
          ) : (
            <Skeleton className="h-9 w-9 rounded-full" />
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
