"use client";
import {
  Bug,
  Building2,
  LayoutDashboard,
  Settings,
  TextSearch,
} from "lucide-react";
import Typography from "../../components/typography/typography";
import Logo from "../../icons/logo/Logo.icon";
import Link from "next/link";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";
import { VrpManagement } from "../../icons";
import { usePathname } from "next/navigation";
import { borderColor, menuItems } from "@/core/constants";

interface SidebarProps {
  type: string;
}

const iconsObject: { [key: string]: React.ReactNode } = {
  dashboard: <LayoutDashboard className="h-6 w-6" />,
  programs: <TextSearch className="h-6 w-6" />,
  reports: <Bug className="h-6 w-6" />,
  companies: <Building2 className="h-6 w-6" />,
  "vrp launchpad": <Bug className="h-6 w-6" />,
  "vrp management": <VrpManagement className="h-6 w-6" />,
};

const Sidebar = ({ type }: SidebarProps) => {
  const pathname = usePathname();
  const menu = menuItems[type as keyof typeof menuItems];
  return (
    <div
      className={cn(
        "_flexbox__col__between relative h-full max-h-screen",
        "w-[272px] bg-background-main-light pb-16 dark:bg-background-main-dark"
      )}
    >
      <div className="_flexbox__col__start w-full gap-8">
        <div className="px-12 py-3">
          <Logo className="h-[68px] w-[182px]" />
        </div>
        <div className="_flexbox__col__center w-full gap-4 pr-5">
          {menu.map((item, index) => (
            <Link
              key={`navbar-item-${index}`}
              href={item.path}
              className={cn(
                "_flexbox__row__center__start h-16 w-full gap-4",
                "rounded-r-3xl pl-12 hover:bg-background-page-light dark:hover:bg-background-page-dark",
                "border-l-2 border-transparent",
                `hover:${borderColor[type as keyof typeof borderColor]}`,
                pathname.includes(item.path)
                  ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
                  : "bg-transparent font-normal"
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
      <div
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
            "border-l-2 border-transparent",
            `hover:${borderColor[type as keyof typeof borderColor]}`,
            pathname.includes("/settings")
              ? `${borderColor[type as keyof typeof borderColor]} bg-background-page-light *:font-bold dark:bg-background-page-dark`
              : "bg-transparent font-normal"
          )}
        >
          <Settings className="h-6 w-6" />
          <Typography variant="p" affects="normal">
            Settings
          </Typography>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
