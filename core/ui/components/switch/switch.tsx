"use client";
import { useState } from "react";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";

interface I_SwitchProps {
  className?: string;
  onChange?: () => void;
  variant?: keyof typeof Role;
}

const colorSwitch: { [key in Role]: { active: string; inactive: string } } = {
  hacker: {
    active: "bg-lime-normal-light dark:bg-lime-normal-dark",
    inactive: "bg-lime-lighter-light/20 dark:bg-lime-lighter-dark/20",
  },
  company: {
    active: "bg-sky-normal",
    inactive: "bg-sky-lighter/20",
  },
  mediator: {
    active: "bg-violet-normal",
    inactive: "bg-violet-darker",
  },
};

const Switch = ({ className, onChange, variant = "hacker" }: I_SwitchProps) => {
  const [active, setActive] = useState<boolean>(false);
  const onClickSwitch = () => {
    setActive(!active);
    if (onChange) {
      onChange();
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-6 w-12 cursor-pointer items-center justify-between",
        "overflow-hidden rounded-full px-1.5 py-1 transition-all duration-200",
        active
          ? colorSwitch[variant].active
          : "bg-neutral-light-80 dark:bg-neutral-dark-80",
        className
      )}
      onClick={onClickSwitch}
    >
      <div
        className={cn(
          "aspect-square h-full rounded-full transition-all duration-200",
          active
            ? "translate-x-5 bg-white"
            : `translate-x-0 ${colorSwitch[variant].inactive}`
        )}
      />
    </div>
  );
};
export default Switch;
