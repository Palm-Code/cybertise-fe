"use client";
import Image from "next/image";
import { Avatar, ThemeSwitcher } from "../../components";
import { Logo } from "../../icons";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="flex w-full flex-col">
      <div className="h-fit w-full bg-background-main-light dark:bg-background-main-dark">
        <div className="flex w-full items-center justify-between px-12">
          <Link href={"/"}>
            <Logo className="h-[94px] w-[183px]" />
          </Link>
          <div className="flex items-center gap-8">
            <ThemeSwitcher />
            {/* <Avatar image={data?.data.image} /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
