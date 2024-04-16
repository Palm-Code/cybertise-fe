import { Desktop, Mobile } from "..";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import Logo from "../../icons/logo/Logo.icon";
import Link from "next/link";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Mobile>
        <div className="relative flex h-dvh w-full flex-col items-center justify-start gap-8 py-8">
          <Link href="/auth/signin">
            <Logo className="h-12 w-32" />
          </Link>
          {children}
        </div>
      </Mobile>
      <Desktop>
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 pb-28 pt-12">
          <ThemeSwitcher className="absolute right-5 top-5" />
          <Link href="/auth/signin">
            <Logo />
          </Link>
          {children}
        </div>
      </Desktop>
    </>
  );
};
export default AuthWrapper;
