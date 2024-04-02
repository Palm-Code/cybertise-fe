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

export const signupFormSchema = z.object({
  corporate_name: z.string().min(1, { message: "Corporate Name is required" }),
  corporate_website: z
    .string()
    .min(1, { message: "Corporate Website is required" }),
  address: z.string().email({ message: "Address is required" }),
  address_line_2: z.string().email().optional(),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zip_code: z.string().min(1, { message: "Zip Code is required" }),
  phone_number: z.string().min(1, { message: "Phone Number is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormSchema = z.infer<typeof signupFormSchema>;

const SignUpCompany = () => {
  const method = useForm<FormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      corporate_name: "",
      corporate_website: "",
      address: "",
      address_line_2: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      phone_number: "",
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
