import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { X } from "lucide-react";
import { I_ModalSetup2faProps } from "../ModalSetup2fa";
import { OTPInput, SlotProps } from "input-otp";
import { useState } from "react";

const InputOtp = ({
  title = "Activate Your Authenticator",
  isLoading = false,
  variant = "hacker",
  onClickActivate = () => {},
  isError = false,
  ...props
}: I_ModalSetup2faProps & {
  onClickActivate?: (otp: string) => void;
  isError?: boolean;
  title?: string;
}) => {
  const [otp, setOtp] = useState("");
  return (
    <div
      className={cn(
        "_flexbox__col__center mx-auto w-full max-w-xl gap-16 rounded-lg",
        "bg-background-main-light p-10 dark:bg-background-main-dark"
      )}
    >
      <div className="_flexbox__col__center w-full gap-6">
        <Button
          variant={`tertiary-${variant}`}
          prefixIcon={<X />}
          onClick={props.onClose}
          className="mr-auto p-0"
        >
          Cancel
        </Button>
        <Typography variant="h4" weight="semibold">
          {title}
        </Typography>
        <Typography variant="p" affects="normal" align="center">
          Please enter authenticator code from your verified Two-Factor
          Authenticator app.
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2">
        <OTPInput
          autoFocus
          ref={(input) => input?.focus()}
          disabled={isLoading}
          id={`otp-${title}`}
          name={`otp-${title}`}
          maxLength={6}
          onComplete={() => onClickActivate(otp)}
          value={otp}
          onChange={setOtp}
          containerClassName="group w-full flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="_flexbox__row__center__between w-full gap-2">
                {slots.map((slot, idx) => (
                  <Slot isError={isError} key={`slot-${idx}`} {...slot} />
                ))}
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
};

export function Slot(props: SlotProps & { isError?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[48/56] w-12 md:h-[90px] md:w-16",
        "mx-1 items-center justify-center rounded-xl",
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

export default InputOtp;
