import { cn } from "@/core/lib/utils";
import Avatar from "../../components/avatar/avatar";
import ThemeSwitcher from "../../components/theme/theme-switcher";

const Header = () => {
  return (
    <div
      className={cn(
        "w-full bg-background-main-light px-12 py-6 dark:bg-background-main-dark",
        "_flexbox__row__center__end gap-8"
      )}
    >
      <ThemeSwitcher />
      <Avatar image="https://github.com/shadcn.png" />
    </div>
  );
};
export default Header;
