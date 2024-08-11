import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "..";

const SignupBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={cn(
          "relative mx-auto w-full max-w-2xl rounded-lg",
          "px-6 transition-all duration-75 xl:p-20",
          "xl:bg-background-main-light xl:dark:bg-background-main-dark"
        )}
      >
        {children}
      </div>
    </>
  );
};
export default SignupBoxWrapper;
