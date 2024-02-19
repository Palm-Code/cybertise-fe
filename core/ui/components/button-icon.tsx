import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";

interface ButtonIconProps extends ButtonProps {
  prefixIcon?: React.ReactNode;
  postFixIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ButtonIcon = ({
  postFixIcon,
  children,
  prefixIcon,
  ...props
}: ButtonIconProps) => {
  return (
    <Button {...props}>
      {prefixIcon}
      {children}
      {postFixIcon}
    </Button>
  );
};
export default ButtonIcon;
