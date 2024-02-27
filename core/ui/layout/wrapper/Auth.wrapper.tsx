"use client";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import Logo from "../../icons/logo/Logo.icon";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 pb-28 pt-12">
      <ThemeSwitcher className="absolute right-5 top-5" />
      <Logo />
      {children}
    </div>
  );
};
export default AuthWrapper;
