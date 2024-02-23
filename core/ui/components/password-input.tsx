"use client";
import { useState } from "react";
import { Input, InputProps } from "./input";
import { useClickAway } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import Typography from "./typography";
import ValidationCheck from "./validation-check";
import { passwordValidation } from "@/core/constants";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { cn } from "@/core/lib/utils";

interface I_PasswordInputProps extends InputProps {
  check?: boolean;
  title?: string;
  withRegex?: boolean;
  isConfirmation?: boolean;
  options?: PasswordValidationItemsType[];
}

const PasswordInput = (props: I_PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useClickAway<HTMLInputElement>(() => {
    setIsFocused(false);
  });

  return (
    <div className="_flexbox__col__start w-full gap-2 transition-all duration-100">
      <Input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        onClickRevealPassword={() => setShowPassword(!showPassword)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {props.withRegex && (
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid w-full grid-cols-2 content-between gap-y-2.5 rounded-lg bg-neutral-light-80 px-5 py-[17px] dark:bg-neutral-dark-90"
            >
              {props.options?.length! &&
                props.options.map((item, index) => (
                  <Typography
                    key={index}
                    variant="p"
                    affects="small"
                    className="inline-flex items-center gap-2"
                  >
                    <ValidationCheck check={item.checked} />
                    {item.content}
                  </Typography>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {props.isConfirmation && (
        <Typography
          variant="p"
          affects="tiny"
          align="left"
          className={cn(
            props.check ? "!text-emerald-normal" : "!text-red-error"
          )}
        >
          {props.check ? "Password Matched" : "Password doesn't match"}
        </Typography>
      )}
    </div>
  );
};
export default PasswordInput;
