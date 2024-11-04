"use client";
import { cn } from "@/core/lib/utils";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import { Logo } from "../../icons";
import { usePostLogout, usePostUpdateLang } from "@/core/react-query/client";
import HeaderDropdown from "../../components/dropdown/header-dropdown";
import { Globe, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageDropdown from "./dropdown/LanguageDropdown.component";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/core/zustands/user";

const Header = () => {
  const t = useTranslations("Sidebar");
  const { data: user } = useUserStore();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>(user.language);
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

  const { mutate } = usePostUpdateLang();

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
          {pathname.includes("/settings") && (
            <LanguageDropdown
              label=""
              triggerClassName="!p-0 absolute right-2"
              prefixIcon={<Globe className="size-5 md:size-6" />}
              value={language}
              options={[
                {
                  label: "EN",
                  value: "en",
                },
                {
                  label: "DE",
                  value: "de",
                },
              ]}
              onValueChange={(v) => {
                setLanguage(v);
                mutate(v);
              }}
            />
          )}
        </div>
      </div>
      <div className="hidden w-full xl:block">
        <div
          className={cn(
            "w-full bg-background-main-light px-12 py-6 dark:bg-background-main-dark",
            "_flexbox__row__center__end gap-8"
          )}
        >
          {pathname.includes("/settings") && (
            <LanguageDropdown
              label=""
              triggerClassName="!p-0"
              prefixIcon={<Globe className="size-6" />}
              value={language}
              options={[
                {
                  label: "EN",
                  value: "en",
                },
                {
                  label: "DE",
                  value: "de",
                },
              ]}
              onValueChange={(v) => {
                setLanguage(v);
                mutate(v);
              }}
            />
          )}
          <ThemeSwitcher />
          <HeaderDropdown
            avatar={user.avatar}
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
        </div>
      </div>
    </>
  );
};
export default Header;
