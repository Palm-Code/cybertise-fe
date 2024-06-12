"use client";
import { cn } from "@/core/lib/utils";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { Locker2 } from "@/core/ui/icons";
import Link from "next/link";
import React from "react";
import { OTPInput, SlotProps } from "input-otp";
import { Desktop, Mobile } from "@/core/ui/layout";

interface I_MultiFactorAuth extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  onCompleteInput: (v: string) => void;
  isError?: boolean;
  isLoading?: boolean;
}

const MultiFactorAuth = ({
  isLoading = false,
  isError,
  ...props
}: I_MultiFactorAuth) => {
  return (
    <>
      <Mobile>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg",
            "_flexbox__col__center gap-4",
            props.noPadding ? "p-0" : "px-6 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker2 />
            <Typography variant="h4" weight="bold" align={"center"}>
              Authenticate Your Account
            </Typography>
            <Typography variant="p" affects="small" className="text-center">
              Protecting your account is our top priority. Please confirm your
              activity by entering code from your authenticator app
            </Typography>
          </div>
          <div className="flex w-full items-center justify-center">
            <OTPInput
              disabled={isLoading}
              maxLength={6}
              onComplete={(v: string) => {
                props.onCompleteInput(v);
              }}
              autoFocus
              containerClassName="group w-full flex items-center has-[:disabled]:opacity-30"
              render={({ slots }) => (
                <>
                  <div className="_flexbox__row__center w-full gap-1.5">
                    {slots.map((slot, idx) => (
                      <Slot isError={isError} key={`slot-${idx}`} {...slot} />
                    ))}
                  </div>
                </>
              )}
            />
          </div>
          <Link
            href="/auth/mfa?type=authenticator"
            className={cn(
              typographyVariants({
                variant: "p",
                affects: "normal",
                align: "center",
                weight: "bold",
              }),
              "absolute bottom-8 !text-emerald-normal underline"
            )}
          >
            Authenticator code not works?
          </Link>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
            "_flexbox__col__center gap-16",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker2 />
            <Typography variant="h4" weight="bold">
              Authenticate Your Account
            </Typography>
            <Typography variant="p" affects="normal" className="text-center">
              Protecting your account is our top priority. Please confirm your
              activity by entering code from your authenticator app
            </Typography>
          </div>
          <div className="flex w-full items-center justify-center">
            <OTPInput
              disabled={isLoading}
              maxLength={6}
              autoFocus
              onComplete={(v: string) => {
                props.onCompleteInput(v);
              }}
              containerClassName="group w-full flex items-center has-[:disabled]:opacity-30"
              render={({ slots }) => (
                <>
                  <div className="_flexbox__row__center w-full gap-1.5">
                    {slots.map((slot, idx) => (
                      <Slot isError={isError} key={`slot-${idx}`} {...slot} />
                    ))}
                  </div>
                </>
              )}
            />
          </div>
          <Link
            href="mailto:uQpKw@example.com"
            className={cn(
              typographyVariants({
                variant: "p",
                affects: "normal",
                align: "center",
                weight: "bold",
              }),
              "!text-emerald-normal underline"
            )}
          >
            Authenticator code not works?
          </Link>
        </div>
      </Desktop>
    </>
  );
};

export function Slot(props: SlotProps & { isError?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[48/56] w-12 md:aspect-[48/50] md:h-[90px] md:w-19",
        "mx-1 items-center justify-center rounded-md",
        "border-neutral-light-0 text-[2rem] dark:border-neutral-dark-0",
        props.isActive
          ? "border-4"
          : props.isError
            ? "border border-red-normal dark:border-red-normal"
            : "border"
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && null}
    </div>
  );
}

export default MultiFactorAuth;
