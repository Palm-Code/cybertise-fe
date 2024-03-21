"use client";
import { cn } from "@/core/lib/utils";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { Locker2 } from "@/core/ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { OTPInput, SlotProps } from "input-otp";

interface I_MultiFactorAuth extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const MultiFactorAuth = (props: I_MultiFactorAuth) => {
  return (
    <div
      className={cn(
        "w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
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
          maxLength={6}
          onComplete={() => {
            redirect("/auth/mfa?type=authenticator");
          }}
          containerClassName="group w-full flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="_flexbox__row__center__between w-full">
                {slots.map((slot, idx) => (
                  <Slot key={`slot-${idx}`} {...slot} />
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
          "!text-emerald-normal underline"
        )}
      >
        Authenticator code not works?
      </Link>
    </div>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative flex h-[90px] w-16",
        "items-center justify-center rounded-xl",
        "border-neutral-light-0 text-[2rem] dark:border-neutral-dark-0",
        props.isActive ? "border-4" : "border"
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && null}
    </div>
  );
}

export default MultiFactorAuth;
