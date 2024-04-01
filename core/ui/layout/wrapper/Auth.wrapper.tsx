"use client";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import Logo from "../../icons/logo/Logo.icon";
import Link from "next/link";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 overflow-auto pb-28 pt-12">
      <ThemeSwitcher className="absolute right-5 top-5" />
      <Link href="/auth/signin">
        <Logo />
      </Link>
      {children}
    </div>
  );
};
export default AuthWrapper;
