"use client";
import { useState } from "react";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";

interface I_SwitchProps {
  className?: string;
  onChange?: (v: 0 | 1) => void;
  variant?: keyof typeof Role;
  value?: number;
  disabled?: boolean;
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
  "company staff": {
    active: "bg-sky-normal",
    inactive: "bg-sky-lighter/20",
  },
  mediator: {
    active: "bg-violet-normal",
    inactive: "bg-violet-darker",
  },
};

const Switch = ({
  className,
  onChange,
  variant = "hacker",
  value = 0,
  disabled = false,
}: I_SwitchProps) => {
  const onClickSwitch = () => {
    if (onChange) {
      onChange(value === 0 ? 1 : 0);
    }
  };

  return (
    <button
      title="Switch"
      type="button"
      className={cn(
        "relative flex h-6 w-12 cursor-pointer items-center justify-between focus:outline-0 focus:ring-0 disabled:opacity-30",
        "overflow-hidden rounded-full px-1.5 py-1 transition-all duration-200",
        value === 1
          ? colorSwitch[variant].active
          : "bg-neutral-light-80 dark:bg-neutral-dark-80",
        disabled && "opacity-30",
        className
      )}
      onClick={onClickSwitch}
    >
      <div
        className={cn(
          "aspect-square h-full rounded-full transition-all duration-200 ",
          value === 1
            ? "translate-x-5 bg-white"
            : `translate-x-0 ${colorSwitch[variant].inactive}`
        )}
      />
    </button>
  );
};
export default Switch;
