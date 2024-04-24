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
import { login } from "@/service/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { MultiFactor, SuccessState } from "..";
import { Desktop, Mobile } from "@/core/ui/layout";
import Cookies from "universal-cookie";

const formShcema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string(),
});

type FormSchema = z.infer<typeof formShcema>;

const SignInComponent = () => {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const { push } = useRouter();
  const [isSuccess, setIsSuccess] = useState<"2fa" | "email" | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    resetField,
  } = useForm<FormSchema>({
    resolver: zodResolver(formShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forms = getValues();

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setIsSuccess(null);
    setLoadingSubmit(true);
    try {
      setTimeout(async () => {
        const { user } = await login(data);
        const cookies = new Cookies();
        cookies.set("token", user.token, { path: "/" });
        push(callbackUrl || "/dashboard");
      }, 100);
    } catch (error) {
      setIsSuccess(null);
    }
  };

  const validateIsFormFilled = isObjectEmpty({
    email: forms.email,
    password: forms.password,
  });

  if (isSuccess === "email") {
    return <SuccessState />;
  }

  if (isSuccess === "2fa") {
    return <MultiFactor />;
  }

  // console.log({ errors });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("mx-auto w-full max-w-[467px] rounded-lg")}
    >
      <Mobile className="_flexbox__col__center gap-8 bg-transparent px-6">
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
            value={forms.email}
            placeholderText="Enter your email"
            onClearInput={() => resetField("email")}
            onChange={(e) =>
              setValue("email", e.target.value, { shouldValidate: true })
            }
            isError={errors === null}
          />
          <div className="w-full space-y-1">
            <Input
              type={revealPassword ? "text" : "password"}
              label="Password"
              placeholderText="Enter your password"
              value={forms.password}
              onClickRevealPassword={() => setRevealPassword(!revealPassword)}
              onChange={(e) =>
                setValue("password", e.target.value, {
                  shouldValidate: true,
                })
              }
              isError={errors === null}
            />
            <Link
              href={"/auth/forgot-password"}
              className={typographyVariants({
                variant: "p",
                affects: "tiny",
              })}
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
            isLoading={loadingSubmit}
            disabled={validateIsFormFilled || loadingSubmit}
          >
            Sign In
          </Button>
        </div>
        <Typography
          variant="p"
          affects="normal"
          align="center"
          className="absolute bottom-8"
        >
          Didn&apos;t have account yet?{" "}
          <Link
            href={"/auth/signup"}
            className="ml-2 font-semibold text-lime-normal-light dark:text-lime-normal-dark"
          >
            Sign Up
          </Link>
        </Typography>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__center gap-12 bg-background-main-light px-10 py-20 dark:bg-background-main-dark">
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
              value={forms.email}
              onChange={(e) =>
                setValue("email", e.target.value, { shouldValidate: true })
              }
              // isError={!!errors}
            />
            <div className="w-full space-y-1">
              <Input
                type={revealPassword ? "text" : "password"}
                label="Password"
                placeholderText="Enter your password"
                onClickRevealPassword={() => setRevealPassword(!revealPassword)}
                value={forms.password}
                onChange={(e) =>
                  setValue("password", e.target.value, { shouldValidate: true })
                }
                // isError={!!errors}
              />
              <Link
                href={"/auth/forgot-password"}
                className={typographyVariants({
                  variant: "p",
                  affects: "tiny",
                })}
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
              isLoading={loadingSubmit}
              disabled={validateIsFormFilled || loadingSubmit}
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
        </div>
      </Desktop>
    </form>
  );
};
export default SignInComponent;
