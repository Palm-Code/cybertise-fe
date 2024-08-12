import { cn } from "@/core/lib/utils";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import Logo from "../../icons/logo/Logo.icon";
import Link from "next/link";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={cn(
          "realtive flex h-dvh w-full",
          "flex-col items-center justify-start gap-8 py-8",
          "xl:h-auto xl:min-h-screen xl:gap-24 xl:pb-28 xl:pt-12"
        )}
      >
        <ThemeSwitcher className="absolute right-5 top-5 hidden xl:flex" />
        <Link href="/auth/signin" replace>
          <Logo className="h-12 w-32 xl:h-[99px] xl:w-[264px]" />
        </Link>
        {children}
      </div>
    </>
  );
};
export default AuthWrapper;
