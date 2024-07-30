"use client";
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
import { VrpManagement } from "../../icons";
import { usePathname } from "next/navigation";
import { borderColor, menuItems } from "@/core/constants/common";
import { Desktop, Mobile } from "..";
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
import { useGetUserData, usePostLogout } from "@/core/react-query/client";

interface SidebarProps {
  type: keyof typeof Role;
}

const iconsObject: { [key: string]: React.ReactNode } = {
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  programs: <TextSearch className="h-6 w-6" />,
  reports: <Bug className="h-6 w-6" />,
  companies: <Building2 className="h-6 w-6" />,
  "vrp launchpad": <Bug className="h-6 w-6" />,
  "vrp management": (
    <VrpManagement className="h-6 w-6 fill-black dark:fill-white" />
  ),
  "manage company": <Building2 className="h-6 w-6" />,
};

const Sidebar = ({ type }: SidebarProps) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const menu = menuItems[type as keyof typeof menuItems];

  const { mutateAsync } = usePostLogout();
  const { data: user } = useGetUserData();

  return (
    <>
      <Mobile>
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
                  <Typography variant="h6" weight="bold">
                    Menu
                  </Typography>
                </div>
                <Avatar image={user?.avatar as string} />
              </div>
              <div className="_flexbox__col__center w-full gap-4 pr-5">
                {menu.map((item, index) => (
                  <Link
                    key={`navbar-item-${index}`}
                    href={item.path}
                    className={cn(
                      "_flexbox__row__center__start h-16 w-full gap-4",
                      "rounded-r-3xl pl-6 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                      "border-l-2",
                      `hover:${borderColor[type as keyof typeof borderColor]}`,
                      pathname.includes(item.path)
                        ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                        : "border-transparent bg-transparent font-normal dark:border-transparent"
                    )}
                  >
                    {iconsObject[item.title.toLowerCase()]}
                    <Typography variant="p" affects="normal">
                      {item.title}
                    </Typography>
                  </Link>
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
                  <Typography variant="p" affects="normal">
                    Settings
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
                  <Typography variant="p" affects="normal">
                    Logout
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
              <Typography variant="p" affects="normal" className="capitalize">
                {theme} Mode
              </Typography>
              <ThemeSwitcher />
            </div>
          </SheetContent>
        </Sheet>
      </Mobile>
      <Desktop className="h-full">
        <div
          className={cn(
            "_flexbox__col__between relative h-full max-h-screen",
            "w-[272px] bg-background-main-light pb-16 dark:bg-background-main-dark"
          )}
        >
          <div className="_flexbox__col__start w-full gap-8">
            <Link href="/dashboard" className="px-12 py-3">
              <Logo className="h-[68px] w-[182px]" />
            </Link>
            <div className="_flexbox__col__center w-full gap-4 pr-5">
              {menu.map((item, index) => (
                <Link
                  key={`navbar-item-${index}`}
                  href={item.path}
                  className={cn(
                    "_flexbox__row__center__start h-16 w-full gap-4",
                    "rounded-r-3xl pl-12 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                    "border-l-2",
                    `hover:${borderColor[type as keyof typeof borderColor]}`,
                    pathname.includes(item.path)
                      ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                      : "border-transparent bg-transparent font-normal dark:border-transparent"
                  )}
                >
                  {iconsObject[item.title.toLowerCase()]}
                  <Typography variant="p" affects="normal">
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </div>
          </div>
          {/* <div
            className={cn(
              "_flexbox__col__center sticky bottom-[calc(64px+env(safe-area-inset-bottom))]",
              "w-full gap-4 pr-5"
            )}
          >
            <Link
              href="/settings"
              className={cn(
                "_flexbox__row__center__start h-16 w-full gap-4",
                "rounded-r-3xl pl-12 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                "border-l-2",
                `hover:${borderColor[type as keyof typeof borderColor]}`,
                pathname.includes("/settings")
                  ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                  : "border-transparent bg-transparent font-normal dark:border-transparent"
              )}
            >
              <Settings className="h-6 w-6" />
              <Typography variant="p" affects="normal">
                Settings
              </Typography>
            </Link>
            <button
              type="submit"
              className={cn(
                "_flexbox__row__center__start h-16 w-full gap-4",
                "rounded-r-3xl pl-12 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                "border-l-2",
                `hover:${borderColor[type as keyof typeof borderColor]}`,
                "border-transparent bg-transparent font-normal dark:border-transparent"
              )}
              onClick={() => mutateAsync()}
            >
              <LogOut className="h-6 w-6" />
              <Typography variant="p" affects="normal">
                Logout
              </Typography>
            </button>
          </div> */}
        </div>
      </Desktop>
    </>
  );
};
export default Sidebar;
