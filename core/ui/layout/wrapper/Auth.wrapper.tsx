import { Desktop, Mobile } from "..";
import ThemeSwitcher from "../../components/theme/theme-switcher";
import Logo from "../../icons/logo/Logo.icon";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Mobile>
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-12 py-8">
          <Logo className="h-12 w-32" />
          {children}
        </div>
      </Mobile>
      <Desktop>
        <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 pb-28 pt-12">
          <ThemeSwitcher className="absolute right-5 top-5" />
          <Logo />
          {children}
        </div>
      </Desktop>
    </>
  );
};
export default AuthWrapper;
