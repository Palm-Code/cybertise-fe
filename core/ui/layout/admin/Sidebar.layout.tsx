"use client";
import React from "react";
import {
  AlignJustify,
  Bug,
  Building2,
  LayoutDashboard,
  LogOut,
  Settings,
  TextSearch,
  X,
} from "lucide-react";
import Typography from "../../components/typography/typography";
import Logo from "../../icons/logo/Logo.icon";
import Link from "next/link";
import { cn } from "@/core/lib/utils";
import { Currency, Service, VrpManagement } from "../../icons";
import { usePathname, useRouter } from "next/navigation";
import { borderColor, useMenuItems } from "@/core/constants/common";
import {
  Avatar,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  ThemeSwitcher,
} from "../../components";
import { useTheme } from "next-themes";
import { Role } from "@/types/admin/sidebar";
import {
  useGetAssetType,
  useGetUserData,
  usePostLogout,
} from "@/core/react-query/client";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAssetTypeStore } from "@/core/zustands/globals/store";
import { useTopLoader } from "nextjs-toploader";

interface SidebarProps {
  type: keyof typeof Role;
}

const iconsObject: { [key: string]: React.ReactNode } = {
  dashboard: <LayoutDashboard className="size-6" />,
  programs: <TextSearch className="size-6" />,
  reports: <Bug className="size-6" />,
  companies: <Building2 className="size-6" />,
  vrp_launchpad: <Bug className="size-6" />,
  vrp_management: (
    <VrpManagement className="size-6 fill-black dark:fill-white" />
  ),
  manage_company: <Building2 className="size-6" />,
  services: <Service className="size-6" />,
  payment: <Currency className="size-6" />,
  earnings: <Currency className={cn("size-6")} />,
};

const Sidebar = ({ type }: SidebarProps) => {
  const t = useTranslations("Sidebar");
  const queryClient = useQueryClient();
  const router = useRouter();
  const loader = useTopLoader();
  const { theme } = useTheme();
  const pathname = usePathname();
  const menuItems = useMenuItems();
  const menu = menuItems[type as keyof typeof menuItems];
  const { data: user } = useGetUserData();
  const { data: assetTypes } = useGetAssetType();
  useAssetTypeStore.setState({ data: assetTypes });

  const { mutateAsync } = usePostLogout();

  return (
    <>
      <div className="w-full xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              title="drawer"
              type="button"
              className="absolute left-6 top-4.5"
            >
              <AlignJustify />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className={cn(
              "_flexbox__col__between fixed left-0 h-full max-h-dvh shadow-sidebar",
              "w-[275px] bg-background-main-light pb-16 dark:bg-background-main-dark"
            )}
          >
            <div className="_flexbox__col__start w-full gap-6">
              <div className="_flexbox__row__center__between mt-8 w-full px-6">
                <div className="_flexbox__row__center__start gap-4">
                  <SheetClose>
                    <X />
                  </SheetClose>
                  <Typography
                    variant="h6"
                    weight="bold"
                  >
                    {t("menu")}
                  </Typography>
                </div>
                <Avatar image={user?.avatar as string} />
              </div>
              <div className="_flexbox__col__center w-full gap-4 pr-5">
                {menu.map((item, index) => (
                  <button
                    key={`navbar-item-${index}`}
                    type="button"
                    className={cn(
                      "grid h-16 w-full grid-cols-[auto_1fr] items-center gap-4",
                      "rounded-r-3xl pl-6 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                      "border-l-2",
                      `hover:${borderColor[type as keyof typeof borderColor]}`,
                      pathname.includes(item.path)
                        ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                        : "border-transparent bg-transparent font-normal dark:border-transparent"
                    )}
                    onClick={(e) => {
                      router.push(item.path);
                      if (item.path === pathname) {
                        e.preventDefault();
                        queryClient.invalidateQueries({
                          queryKey: [item.key],
                        });
                        return;
                      }
                    }}
                  >
                    {iconsObject[item.id.toLowerCase()]}
                    <Typography
                      variant="p"
                      affects="normal"
                    >
                      {item.title}
                    </Typography>
                  </button>
                ))}
                <Link
                  href="/settings"
                  className={cn(
                    "_flexbox__row__center__start h-16 w-full gap-4",
                    "rounded-r-3xl pl-6 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                    "border-l-2 ",
                    `hover:${borderColor[type as keyof typeof borderColor]}`,
                    pathname.includes("/settings")
                      ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                      : "border-transparent bg-transparent font-normal dark:border-transparent"
                  )}
                >
                  <Settings className="h-6 w-6" />
                  <Typography
                    variant="p"
                    affects="normal"
                  >
                    {t("settings")}
                  </Typography>
                </Link>
                <button
                  type="submit"
                  className={cn(
                    "_flexbox__row__center__start h-16 w-full gap-4",
                    "rounded-r-3xl pl-6 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                    "border-l-2",
                    `hover:${borderColor[type as keyof typeof borderColor]}`,
                    "border-transparent bg-transparent font-normal dark:border-transparent"
                  )}
                  onClick={() => mutateAsync()}
                >
                  <LogOut className="h-6 w-6" />
                  <Typography
                    variant="p"
                    affects="normal"
                  >
                    {t("logout")}
                  </Typography>
                </button>
              </div>
            </div>
            <div
              className={cn(
                "_flexbox__row__center__between sticky bottom-[calc(64px+env(safe-area-inset-bottom))]",
                "w-full gap-4 pl-6 pr-5"
              )}
            >
              <Typography
                variant="p"
                affects="normal"
                className="capitalize"
              >
                {theme} {t("mode")}
              </Typography>
              <ThemeSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden h-full w-full xl:block">
        <div
          className={cn(
            "_flexbox__col__between relative h-full max-h-screen",
            "w-[272px] bg-background-main-light pb-16 dark:bg-background-main-dark"
          )}
        >
          <div className="_flexbox__col__start w-full gap-8">
            <Link
              href="/dashboard"
              prefetch
              replace
              className="px-12 py-3"
            >
              <Logo className="h-[68px] w-[182px]" />
            </Link>
            <div className="_flexbox__col__center w-full gap-4 pr-5">
              {menu.map((item, index) => (
                <button
                  key={`navbar-item-${index}`}
                  type="button"
                  className={cn(
                    "_flexbox__row__center__start h-16 w-full gap-4",
                    "rounded-r-3xl pl-12 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                    "border-l-2",
                    `hover:${borderColor[type as keyof typeof borderColor]}`,
                    pathname.includes(item.path)
                      ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                      : "border-transparent bg-transparent font-normal dark:border-transparent"
                  )}
                  onClick={(e) => {
                    loader.start();
                    router.push(item.path);
                    if (item.path === pathname) {
                      e.preventDefault();
                      queryClient.invalidateQueries({
                        queryKey: [item.key],
                      });
                      return;
                    }
                  }}
                >
                  {iconsObject[item.id.toLowerCase()]}
                  <Typography
                    variant="p"
                    affects="normal"
                  >
                    {item.title}
                  </Typography>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
