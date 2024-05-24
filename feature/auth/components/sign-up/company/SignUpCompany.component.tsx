"use client";
import { cn } from "@/core/lib/utils";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { SignupBoxWrapper } from "@/core/ui/layout";
import { MoveLeft, X } from "lucide-react";
import Link from "next/link";
import { useMultistepForm } from "@/utils/multi-step-form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
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

const SignUpCompany = () => {
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
  const { step, next, back, isFirstStep, currentStepIndex, steps, isLastStep } =
    useMultistepForm([
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
        element: <SuccessState noPadding />,
        key: "company-step-three",
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
                <X width={24} height={24} />
                Cancel Sign Up
              </Link>
            ) : isLastStep ? null : (
              <button
                className={cn(
                  typographyVariants({ variant: "p", affects: "normal" }),
                  "!text-neutral-40 inline-flex cursor-pointer gap-2 hover:!text-white"
                )}
                onClick={() => back()}
              >
                <MoveLeft width={24} height={24} />
                Back
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
