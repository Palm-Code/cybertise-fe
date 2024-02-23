"use client";

import { useEffect, useState } from "react";
import Moon from "../icons/moon/Moon.icon";
import { cn } from "@/core/lib/utils";
import Sun from "../icons/sun/Sun.icon";
import { useTheme } from "next-themes";
import SunBackground from "../icons/sun/SunBackground.icon";
import { Cloud, MoonBackground } from "../icons";

interface I_ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: I_ThemeSwitcherProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [switchTheme, setSwitchTheme] = useState<boolean>(
    resolvedTheme === "light" ? true : false
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTimeout(() => {
      setTheme(switchTheme ? "light" : "dark");
    }, 500);
  }, [switchTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex h-8 w-19 cursor-pointer items-center justify-between",
        "overflow-hidden rounded-full transition-all duration-300",
        className
      )}
      onClick={() => setSwitchTheme(!switchTheme)}
    >
      <div
        className={cn(
          "absolute flex h-8 w-19 flex-col transition-all duration-300",

          switchTheme ? "bg-light" : "bg-dark"
        )}
      >
        <SunBackground
          className={cn(
            "absolute inset-0 fill-transparent transition-all duration-200",
            switchTheme ? "opacity-100" : "opacity-0"
          )}
        />
        <MoonBackground
          className={cn(
            "absolute inset-0 fill-transparent transition-all duration-200",
            switchTheme ? "opacity-0" : "opacity-100"
          )}
        />
        <Cloud
          className={cn(
            "absolute transition-transform duration-300",
            switchTheme ? "translate-y-0" : "translate-y-10"
          )}
        />
      </div>
      <Sun
        className={cn(
          "absolute left-1 transition-all duration-300",
          switchTheme
            ? "left-1 translate-x-0 rotate-0"
            : "right-1 translate-x-10 rotate-90 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "absolute left-1 transition-all duration-300",
          switchTheme
            ? "left-1 translate-x-0 rotate-0 opacity-0"
            : "right-1 translate-x-10 rotate-90 opacity-100"
        )}
      />
    </div>
  );
};
export default ThemeSwitcher;
