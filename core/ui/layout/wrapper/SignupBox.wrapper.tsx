import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "..";

const SignupBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Mobile className="h-full">
        <div
          className={cn(
            "relative mx-auto h-full w-full max-w-2xl rounded-lg px-6 transition-all duration-75"
          )}
        >
          {children}
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "relative mx-auto w-full max-w-2xl rounded-lg bg-background-main-light p-20 transition-all duration-75 dark:bg-background-main-dark"
          )}
        >
          {children}
        </div>
      </Desktop>
    </>
  );
};
export default SignupBoxWrapper;
