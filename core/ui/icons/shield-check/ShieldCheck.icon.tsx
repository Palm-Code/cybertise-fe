"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

export const ShieldCheck = ({ category }: { category: string }) => {
  const { theme } = useTheme();
  const icons: Record<string, string> = {
    S: "/S.svg",
    M: "/M.svg",
    L: "/L.svg",
    XL: "/XL.svg",
    custom: theme === "dark" ? "/custom-white.svg" : "/custom.svg",
  };
  return (
    <Image
      src={`/icons/monetary-awards${icons[category]}`}
      alt={`badge-category-${category}`}
      width={18}
      height={24}
      className="stop_color_bg h-6 w-4.5"
    />
  );
};
