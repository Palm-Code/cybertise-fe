"use client";
import { cn } from "@/core/lib/utils";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { login } from "@/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { MultiFactor, SuccessState } from "..";

const formShcema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string(),
});

type FormSchema = z.infer<typeof formShcema>;

const SignInComponent = () => {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const { push } = useRouter();
  const [isSuccess, setIsSuccess] = useState<"2fa" | "email" | null>(null);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    resetField,
  } = useForm<FormSchema>({
    resolver: zodResolver(formShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setIsLoadingSubmit(true);
    try {
      setTimeout(async () => {
        await login(data);
        push(callbackUrl || "/");
      }, 5000);
    } catch (error) {
      setIsSuccess(null);
    }
  };

  const validateIsFormFilled = isObjectEmpty({
    email: watch("email"),
    password: watch("password"),
  });

  if (isSuccess === "email") {
    return <SuccessState />;
  }

  if (isSuccess === "2fa") {
    return <MultiFactor />;
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "w-full max-w-[467px] rounded-lg bg-background-main-light px-10 py-20 dark:bg-background-main-dark",
        "_flexbox__col__center gap-12"
      )}
    >
      <Typography variant="h4" weight="bold">
        Sign In
      </Typography>
      <div className="_flexbox__col__center w-full gap-7">
        {errors.email || errors.password ? (
          <div className="w-full rounded-md bg-red-error/20 p-3.5">
            <Typography variant="p" affects="tiny">
              Your email or password is incorrect.
            </Typography>
          </div>
        ) : null}
        <Input
          type="email"
          label="Email"
          placeholderText="Enter your email"
          onClearInput={() => resetField("email")}
          {...register("email")}
          // isError={!!errors}
        />
        <div className="w-full space-y-1">
          <Input
            type={revealPassword ? "text" : "password"}
            label="Password"
            placeholderText="Enter your password"
            onClickRevealPassword={() => setRevealPassword(!revealPassword)}
            {...register("password")}
            // isError={!!errors}
          />
          <Link
            href={"/auth/forgot-password"}
            className={typographyVariants({ variant: "p", affects: "tiny" })}
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="w-full space-y-1">
        <Button
          type="submit"
          fullWidth
          variant="primary-hacker"
          isLoading={isLoadingSubmit}
          disabled={validateIsFormFilled || isLoadingSubmit}
        >
          Sign In
        </Button>
        <Typography variant="p" affects="normal" align="center">
          Didn&apos;t have account yet?{" "}
          <Link href={"/auth/signup"} className="ml-2 font-semibold">
            Sign Up
          </Link>
        </Typography>
      </div>
    </form>
  );
};
export default SignInComponent;
