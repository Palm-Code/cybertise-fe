"use client";
import Button from "@/core/ui/components/button";
import { Input } from "@/core/ui/components/input";
import { StepWrapper } from "@/core/ui/layout";
import { useForm } from "react-hook-form";
import { FormSchema, signupFormSchema } from "../SignUpHacker.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "@/core/ui/components/dropdown";

interface I_HackerStepOneProps {
  onClickNext: () => void;
}

const HackerStepOne = ({ onClickNext }: I_HackerStepOneProps) => {
  const {
    register,
    formState: { errors },
    watch,
    resetField,
  } = useForm<FormSchema>({
    resolver: zodResolver(signupFormSchema),
  });

  const onClickValidate = () => {
    alert(watch("username"));
  };

  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={5}
      title="Hacker Sign Up"
      subtitle="Hacker Details"
    >
      <div className="_flexbox__col__center w-full gap-7">
        <Input
          type="text"
          label="Username"
          onClearInput={() => resetField("username")}
          {...register("username")}
          isError={!!errors.username}
        />
        <Dropdown />
      </div>
      <Button fullWidth onClick={onClickValidate}>
        Next to Step 2
      </Button>
    </StepWrapper>
  );
};
export default HackerStepOne;
