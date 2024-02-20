"use client";
import { cn } from "@/core/lib/utils";
import { Button } from "@/core/ui/components/button";
import { Input } from "@/core/ui/components/input";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography";
import Image from "next/image";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 pt-12">
      <Image src="/cybertise-logo.svg" alt="logo" width={264} height={101} />
      <div
        className={cn(
          "w-full max-w-[467px] rounded-lg bg-background-main-dark px-10 py-20",
          "flex flex-col items-center justify-center gap-12"
        )}
      >
        <Typography variant="h4" weight="bold">
          Sign In
        </Typography>
        <div className="flex w-full flex-col gap-7">
          <Input type="email" label="Email" />
          <div className="space-y-1">
            <Input type="password" label="Password" />
            <Link
              href={"/auth/forgot-password"}
              className={typographyVariants({ variant: "p", affects: "tiny" })}
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="w-full space-y-1">
          <Button fullWidth>Sign In</Button>
          <Typography variant="p" affects="normal" align="center">
            Didn&apos;t have account yet?{" "}
            <Link href={"/auth/register"} className="ml-2 font-semibold">
              Sign Up
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
