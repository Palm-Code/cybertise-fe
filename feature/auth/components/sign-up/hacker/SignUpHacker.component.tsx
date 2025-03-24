"use client";
import { cn } from "@/core/lib/utils";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { SignupBoxWrapper } from "@/core/ui/layout";
import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import HackerStepOne from "./form/HackerStepOne.form";
import HackerStepTwo from "./form/HackerStepTwo.form";
import { useMultistepForm } from "@/utils/multi-step-form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/core/ui/components/progress/progress";
import SuccessState from "../../success-state/SuccesState.component";
import {
  signupHackerFormSchema,
  SignupHackerFormType,
} from "@/core/models/auth/register";
import { usePostResendVerification } from "@/feature/auth/query/resend-verification";
import { useTranslations } from "next-intl";

const SignUpHacker = () => {
  const t = useTranslations("SignUp.hacker");
  const method = useForm<SignupHackerFormType>({
    resolver: zodResolver(signupHackerFormSchema),
    defaultValues: {
      username: "",
      country_code: "",
      email: "",
      password: "",
    },
  });
  const { mutate: resendVerification } = usePostResendVerification();
  const { step, next, back, isFirstStep, currentStepIndex, steps, isLastStep } =
    useMultistepForm([
      {
        element: <HackerStepOne onClickNext={() => next()} />,
        key: "hacker-step-one",
      },
      {
        element: <HackerStepTwo onClickNext={() => next()} />,
        key: "hacker-step-two",
      },
      {
        element: (
          <SuccessState
            onClickResendVerification={() => {
              resendVerification({
                email: method.watch("email"),
                action: "signup_verification",
              });
            }}
            noPadding
          />
        ),
        key: "hacker-step-three",
      },
    ]);

  return (
    <FormProvider {...method}>
      <SignupBoxWrapper>
        {!isLastStep && (
          <Progress
            value={((currentStepIndex + 1) * 100) / (steps.length - 1)}
            className="fixed left-0 top-0 rounded-none xl:absolute xl:rounded-t-lg"
          />
        )}
        <div className="_flexbox__col__start h-full w-full gap-8 xl:gap-12">
          <div className="_flexbox__col__start__start h-full w-full gap-8 transition-all duration-75">
            {isFirstStep ? (
              <Link
                href="/auth/signup"
                className={cn(
                  typographyVariants({ variant: "p", affects: "normal" }),
                  "inline-flex cursor-pointer gap-2",
                  "!text-neutral-light-40 hover:!text-brand-neutral",
                  "dark:text-neutral-dark-40 dark:hover:!text-white"
                )}
              >
                <X
                  width={24}
                  height={24}
                />
                {t("cancel_button")}
              </Link>
            ) : isLastStep ? null : (
              <button
                className={cn(
                  typographyVariants({ variant: "p", affects: "normal" }),
                  "!text-neutral-40 inline-flex cursor-pointer gap-2 hover:!text-white"
                )}
                onClick={() => back()}
              >
                <MoveLeft
                  width={24}
                  height={24}
                />
                {t("back_button")}
              </button>
            )}
            {step}
          </div>
        </div>
      </SignupBoxWrapper>
    </FormProvider>
  );
};
export default SignUpHacker;
