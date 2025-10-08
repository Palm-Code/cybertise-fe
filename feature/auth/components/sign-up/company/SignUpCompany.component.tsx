"use client";
import { cn } from "@/core/lib/utils";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { SignupBoxWrapper } from "@/core/ui/layout";
import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import { useMultistepForm } from "@/utils/multi-step-form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/core/ui/components/progress/progress";
import CompanyStepOne from "./form/CompanyStepOne.form";
import CompanyStepTwo from "./form/CompanyStepTwo.form";
import CompanyStepThree from "./form/CompanyStepThree.form";
import SuccessState from "../../success-state/SuccesState.component";
import {
  signupCompanyFormSchema,
  SignupCompanyFormType,
} from "@/core/models/auth/register";
import { usePostResendVerification } from "@/feature/auth/query/resend-verification";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

const SignUpCompany = () => {
  const t = useTranslations("SignUp.company");
  const [email] = useQueryState("authenticate_email");
  const method = useForm<SignupCompanyFormType>({
    resolver: zodResolver(signupCompanyFormSchema),
    defaultValues: {
      name: "",
      website: "",
      address: "",
      address_2: "",
      country_code: "",
      state: "",
      city: "",
      zip: "",
      password: "",
    },
  });
  const { mutate: resendVerification } = usePostResendVerification();
  const {
    step,
    next,
    back,
    isFirstStep,
    currentStepIndex,
    steps,
    isLastStep,
    goTo,
  } = useMultistepForm([
    {
      element: <CompanyStepOne onClickNext={() => next()} />,
      key: "company-step-one",
    },
    {
      element: <CompanyStepTwo onClickNext={() => next()} />,
      key: "company-step-two",
    },
    {
      element: <CompanyStepThree onClickNext={() => next()} />,
      key: "company-step-three",
    },
    {
      element: (
        <SuccessState
          onClickResendVerification={() =>
            resendVerification({
              email: method.watch("email"),
              action: "signup_verification",
            })
          }
          noPadding
        />
      ),
      key: "company-step-four",
    },
  ]);

  useEffect(() => {
    if (email) {
      goTo(3);
    }
  }, [email]);

  return (
    <FormProvider {...method}>
      <SignupBoxWrapper>
        {!isLastStep && (
          <Progress
            value={((currentStepIndex + 1) * 100) / (steps.length - 1)}
            className="fixed left-0 top-0 rounded-none xl:absolute xl:rounded-t-lg"
          />
        )}
        <div className="_flexbox__col__start h-full w-full gap-12">
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
export default SignUpCompany;
