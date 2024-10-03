"use client";
import { cn } from "@/core/lib/utils";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { useSearchParams } from "next/navigation";
import { MultiFactor, SuccessState } from "..";
import { FormLoginSchema } from "@/types/auth/sign-in";
import { formLoginShcema } from "@/core/models/auth/login/post_login";
import { usePostSignIn } from "../../query/signin";
import { getBrowserAndOS } from "@/utils/device-type";
import { useGetAccessToken } from "@/core/react-query/client";
import { usePostResendVerification } from "../../query/resend-verification";
import { ReactivateAccount } from "../reactivate-account";
import { useTranslations } from "next-intl";

const SignInComponent = () => {
  const t = useTranslations("SignIn");
  const callbackUrl = useSearchParams().get("callbackUrl");
  const auth_2fa = useSearchParams().get("code");
  const auth_email = useSearchParams().get("authenticate_email");
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const {
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginShcema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forms = watch();
  const { mutateAsync, error, isPending, isSuccess } =
    usePostSignIn(callbackUrl);
  const {
    mutate: getAccessToken,
    isPending: isPendingGetToken,
    isSuccess: isSuccessGetToken,
    isError,
  } = useGetAccessToken();
  const { mutate: resendVerification } = usePostResendVerification();
  const [activeData, setActiveData] = useState<any>({
    deactivated_at: undefined,
    destroyed_at: undefined,
    session_code: "",
  });

  const onSubmitLogin = async () => {
    const userAgent = navigator.userAgent;
    const deviceType = getBrowserAndOS(userAgent);
    await mutateAsync({ ...forms, device_type: deviceType }).then((res) => {
      if (res?.data.deactivated_at) {
        setActiveData({
          deactivated_at: res?.data.deactivated_at as Date,
          destroyed_at: res?.data.destroyed_at as Date,
          session_code: res?.data.session_code as string,
        });
      }
    });
  };

  const onSubmitLogin2fa = async (v: string) => {
    const userAgent = navigator.userAgent;
    const deviceType = getBrowserAndOS(userAgent);
    getAccessToken({
      code: auth_2fa ?? "",
      device_type: deviceType,
      totp: v,
    });
  };

  const validateIsFormFilled = isObjectEmpty({
    email: forms.email,
    password: forms.password,
  });

  if (activeData.deactivated_at || activeData.destroyed_at) {
    return <ReactivateAccount data={activeData} />;
  }

  if (auth_email) {
    return (
      <SuccessState
        onClickResendVerification={() => {
          resendVerification({
            email: auth_email,
            action: "login_verification",
          });
        }}
      />
    );
  }

  if (auth_2fa) {
    return (
      <MultiFactor
        isLoading={isPendingGetToken || isSuccessGetToken}
        isError={isError}
        onCompleteInput={onSubmitLogin2fa}
      />
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-[467px] rounded-lg")}>
      <div
        className={cn(
          "_flexbox__col__center gap-8 rounded-lg xl:gap-12",
          "bg-transparent px-6 xl:bg-background-main-light xl:px-10 xl:py-20 xl:dark:bg-background-main-dark"
        )}
      >
        <Typography variant="h4" weight="bold">
          {t("title")}
        </Typography>
        <div className="_flexbox__col__center w-full gap-7">
          {error?.status === 401 ? (
            <div className="w-full rounded-md bg-red-error/20 p-3.5">
              <Typography variant="p" affects="tiny">
                {t("error.missmatch")}
              </Typography>
            </div>
          ) : null}
          {error?.status === 422 ? (
            <div className="w-full rounded-md bg-red-error/20 p-3.5">
              <Typography variant="p" affects="tiny">
                {t("error.not_found")}
              </Typography>
            </div>
          ) : null}
          <Input
            type="email"
            label={t("email")}
            placeholderText={t("email_placeholder")}
            onClearInput={() => setValue("email", "", { shouldValidate: true })}
            value={forms.email}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmitLogin();
              }
            }}
            onChange={(e) =>
              setValue("email", e.target.value, { shouldValidate: true })
            }
            isError={!!error?.email || !!errors.email}
          />
          <div className="w-full space-y-1">
            <Input
              type={revealPassword ? "text" : "password"}
              label={t("password")}
              placeholderText={t("password_placeholder")}
              onClickRevealPassword={() => setRevealPassword(!revealPassword)}
              value={forms.password}
              onChange={(e) =>
                setValue("password", e.target.value, { shouldValidate: true })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmitLogin();
                }
              }}
              isError={!!errors.password}
            />
            <Link
              href={"/forgot-password"}
              className={typographyVariants({
                variant: "p",
                affects: "tiny",
              })}
            >
              {t("forgot_password")}
            </Link>
          </div>
        </div>
        <div className="w-full space-y-1">
          <Button
            fullWidth
            variant="primary-hacker"
            isLoading={isPending || isSuccess}
            disabled={validateIsFormFilled || isPending || isSuccess}
            onClick={onSubmitLogin}
          >
            {t("sign_in_button")}
          </Button>
          <Typography variant="p" affects="normal" align="center">
            {t("not_have_account")}{" "}
            <Link href={"/auth/signup"} className="ml-2 font-semibold">
              {t("sign_up")}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default SignInComponent;
