"use client";
import React, { useRef, useState } from "react";
import Input, { InputProps } from "./input";
import { AnimatePresence, motion } from "framer-motion";
import Typography from "../typography/typography";
import ValidationCheck from "../validation-check/validation-check";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { cn } from "@/core/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { PasswordModalAlert } from "../dialog/password-alert-dialog";

interface I_PasswordInputProps extends InputProps {
  check?: boolean;
  withRegex?: boolean;
  isConfirmation?: boolean;
  options?: PasswordValidationItemsType[];
  isBreached?: boolean;
}

const PasswordInput = ({
  check = false,
  withRegex = false,
  isConfirmation = false,
  options = [],
  isBreached = false,
  ...props
}: I_PasswordInputProps) => {
  const t = useTranslations("PasswordInput");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => {
    if (options.every((item) => item.checked)) {
      setIsFocused(false);
    }
  });

  return (
    <React.Fragment>
      <div className="_flexbox__col__start relative w-full">
        <Input
          wrapperClassName={cn(
            isBreached
              ? "!bg-warning/10 border !border-warning"
              : props.wrapperClassName
          )}
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          onClickRevealPassword={() => setShowPassword(!showPassword)}
          onClickWarningIcon={() => setShowAlert(true)}
          isBreached={isBreached}
          onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          id={`${withRegex ? "with-regex" : "without-regex"}-${isConfirmation ? "confirmation" : "password"}`}
          {...props}
        />
        <AnimatePresence>
          {isFocused && withRegex && (
            <motion.div
              key="options"
              initial={{ height: 0, marginTop: "0px", opacity: 0 }}
              animate={{ height: "auto", marginTop: "8px", opacity: 1 }}
              exit={{ height: 0, marginTop: "0px", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-lg bg-neutral-light-80 dark:bg-neutral-dark-90"
            >
              <div className="grid w-full grid-cols-1 items-start gap-2.5 rounded-lg bg-neutral-light-80 px-5 py-[17px] min-[435px]:grid-cols-2 dark:bg-neutral-dark-90">
                {options?.length! &&
                  options.map((item, index) => (
                    <Typography
                      key={`item-${index}`}
                      variant="p"
                      affects="small"
                      className="grid grid-cols-[auto_1fr] items-start gap-2.5"
                    >
                      <ValidationCheck check={item.checked} />
                      {item.content}
                    </Typography>
                  ))}
              </div>
              <div className="grid w-full grid-cols-1 items-start gap-2.5 rounded-lg bg-neutral-light-80 px-5 py-[17px] dark:bg-neutral-dark-90">
                <div
                  className={cn(
                    "w-full rounded-[10px] p-2",
                    "border !border-warning !bg-warning/10"
                  )}
                >
                  <Typography variant={"p"} affects="small">
                    {t("password_alert.read_more_explanation")}
                  </Typography>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {isConfirmation && (
          <Typography
            variant="p"
            affects="tiny"
            align="left"
            className={cn(check ? "!text-emerald-normal" : "!text-red-error")}
          >
            {check ? t("password_matched") : t("password_not_matched")}
          </Typography>
        )}
      </div>
      <PasswordModalAlert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </React.Fragment>
  );
};
export default PasswordInput;
