import { Loader2 } from "lucide-react";
import { BaseButton, BaseButtonProps } from "./base-button";
import Link from "next/link";
import { cn } from "@/core/lib/utils";

export interface ButtonProps extends BaseButtonProps {
  prefixIcon?: React.ReactNode;
  postFixIcon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  asLink?: boolean;
  href?: string;
  target?: string;
}

const Button = ({
  postFixIcon,
  children,
  prefixIcon,
  isLoading,
  asLink = false,
  href,
  target = "_self",
  ...props
}: ButtonProps) => {
  if (asLink) {
    return (
      <Link
        href={href as string}
        target={target}
        className={cn(
          `${props.fullWidth && "w-full"} mt-1 rounded-full`,
          props.className
        )}
      >
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
      </Link>
    );
  }

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
