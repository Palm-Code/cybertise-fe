"use client";
import { cn } from "@/core/lib/utils";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { Locker2 } from "@/core/ui/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useTranslations } from "next-intl";

interface I_MultiFactorAuth extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  onCompleteInput?: (v: string) => void;
  isError?: boolean;
  isLoading?: boolean;
}

const MultiFactorAuth = ({
  isLoading = false,
  isError,
  onCompleteInput = () => {},
  ...props
}: I_MultiFactorAuth) => {
  const t = useTranslations("AuthenticateOtp");
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (isError) setOtp("");
  }, [isError]);
  return (
    <>
      <div
        className={cn(
          "mx-auto w-full max-w-[553px] rounded-lg",
          "xl:bg-background-main-light xl:dark:bg-background-main-dark",
          "_flexbox__col__center gap-16",
          props.noPadding ? "p-0" : "px-10 py-20",
          props.className
        )}
        {...props}
      >
        <div className="_flexbox__col__center w-full gap-6">
          <Locker2 />
          <Typography variant="h4" weight="bold">
            {t("title")}
          </Typography>
          <Typography variant="p" affects="normal" className="text-center">
            {t("description")}
          </Typography>
        </div>
        <div className="flex w-full items-center justify-center">
          <OTPInput
            disabled={isLoading}
            ref={(input) => input?.focus()}
            maxLength={6}
            id={`otp-signin`}
            name={`otp-signin`}
            autoFocus
            onComplete={(v: string) => {
              onCompleteInput(otp);
            }}
            value={otp}
            onChange={(v: string) => {
              setOtp(v);
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
          {t("authenticator_error")}
        </Link>
      </div>
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
