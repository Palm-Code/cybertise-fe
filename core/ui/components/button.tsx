import { Loader2 } from "lucide-react";
import { BaseButton, BaseButtonProps } from "./base-button";

interface ButtonProps extends BaseButtonProps {
  prefixIcon?: React.ReactNode;
  postFixIcon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({
  postFixIcon,
  children,
  prefixIcon,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton {...props}>
      {isLoading ? (
        <div className="relative flex w-full items-center justify-between gap-2.5">
          <div></div>
          {children}
          <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />
        </div>
      ) : (
        <>
          {prefixIcon}
          {children}
          {postFixIcon}
        </>
      )}
    </BaseButton>
  );
};
export default Button;
