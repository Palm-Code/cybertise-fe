"use client";

import { useEffect, useState } from "react";
import Moon from "../icons/moon/Moon.icon";
import { cn } from "@/core/lib/utils";
import Sun from "../icons/sun/Sun.icon";
import { useTheme } from "next-themes";
import SunBackground from "../icons/sun/SunBackground.icon";
import { Cloud, MoonBackground } from "../icons";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [switchTheme, setSwitchTheme] = useState<boolean>(
    resolvedTheme === "light" ? false : true
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setSwitchTheme(resolvedTheme === "light" ? true : false);
  }, []);

  useEffect(() => {
    switchTheme ? setTheme("light") : setTheme("dark");
  }, [switchTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative w-19 h-8 flex items-center justify-between rounded-full transition-all duration-300 cursor-pointer overflow-hidden"
      )}
      onClick={() => setSwitchTheme(!switchTheme)}
    >
      <div
        className={cn(
          "absolute w-19 h-8 flex flex-col transition-all duration-300",

          switchTheme ? "bg-light" : "bg-dark"
        )}
      >
        <SunBackground
          className={cn(
            "absolute inset-0 transition-all duration-200 fill-transparent",
            switchTheme ? "opacity-100" : "opacity-0"
          )}
        />
        <MoonBackground
          className={cn(
            "absolute inset-0 transition-all duration-200 fill-transparent",
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
