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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/core/ui/components/progress/progress";
import SuccessState from "../../success-state/SuccesState.component";

export const signupFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormSchema = z.infer<typeof signupFormSchema>;

const SignUpHacker = () => {
  const method = useForm<FormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      country: "",
      email: "",
      password: "",
    },
  });
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
        element: <SuccessState noPadding />,
        key: "hacker-step-three",
      },
    ]);

  return (
    <FormProvider {...method}>
      <SignupBoxWrapper>
        {!isLastStep && (
          <Progress
            value={((currentStepIndex + 1) * 100) / (steps.length - 1)}
            className="absolute left-0 top-0 rounded-none rounded-t-lg"
          />
        )}
        <div className="_flexbox__col__start w-full gap-12">
          <div className="_flexbox__col__start w-full gap-8 transition-all duration-75">
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
export default SignUpHacker;
