import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";

interface ButtonIconProps extends ButtonProps {
  prefixIcon?: React.ReactNode;
  postFixIcon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const ButtonIcon = ({
  postFixIcon,
  children,
  prefixIcon,
  isLoading,
  ...props
}: ButtonIconProps) => {
  return (
    <Button {...props}>
      {isLoading ? (
        <div className="flex items-center justify-between gap-2.5">
          {children}
          <Loader2 className="w-6 h-6 animate-spin stroke-[3px]" />
        </div>
      ) : (
        <>
          {prefixIcon}
          {children}
          {postFixIcon}
        </>
      )}
    </Button>
  );
};
export default ButtonIcon;
