import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import { Locker } from "@/core/ui/icons";
import { Desktop, Mobile } from "@/core/ui/layout";
import React from "react";

interface I_SuccesStateProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const SuccessState = (props: I_SuccesStateProps) => {
  return (
    <>
      <Mobile>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg ",
            "_flexbox__col__center gap-28",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker className="h-12 w-12" />
            <Typography variant="h4" weight="semibold">
              Authenticate Your Account
            </Typography>
            <Typography variant="p" affects="small" align="center">
              Protecting your account is our top priority. Please confirm your
              activity by clicking the magic sent to your email:
            </Typography>
            <Typography variant="p" affects="small" weight="semibold">
              email@example.com
            </Typography>
          </div>
          <Typography variant="p" affects="small" align="center">
            It may take a minute to receive your code. <br /> Haven&apos;t
            received it?{" "}
            <span className="cursor-pointer font-bold text-brand-emerald underline">
              Resend
            </span>
          </Typography>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
            "_flexbox__col__center gap-28",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker />
            <Typography variant="h4" weight="bold">
              Authenticate Your Account
            </Typography>
            <Typography variant="p" affects="normal" align="center">
              Protecting your account is our top priority. Please confirm your
              activity by clicking the magic sent to your email:
            </Typography>
            <Typography variant="p" affects="normal" weight="semibold">
              email@example.com
            </Typography>
          </div>
          <Typography variant="p" affects="normal" align="center">
            It may take a minute to receive your code. <br /> Haven&apos;t
            received it?{" "}
            <span className="cursor-pointer font-bold text-brand-emerald underline">
              Resend
            </span>
          </Typography>
        </div>
      </Desktop>
    </>
  );
};
export default SuccessState;
