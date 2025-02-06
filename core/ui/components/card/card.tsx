import Link, { type LinkProps } from "next/link";
import { cn } from "@/core/lib/utils";

interface I_CardProps {
  children: React.ReactNode;
  isClickable?: boolean;
  href?: LinkProps["href"];
  className?: string;
  isButton?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
}
const Card = ({
  children,
  isClickable = false,
  className,
  href,
  isButton = false,
  onClick,
  disabled = false,
  target = "_self",
  ...props
}: I_CardProps) => {
  if (isClickable) {
    return (
      <Link
        className={cn(
          "relative z-20 flex w-full rounded-lg bg-background-main-light px-6 py-8 xl:p-9",
          "transition-colors duration-75 hover:bg-neutral-light-90 hover:shadow-xl",
          "dark:bg-background-main-dark dark:hover:bg-neutral-dark-90",
          className
        )}
        href={href ?? "#"}
        target={target}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (isButton) {
    return (
      <div
        className={cn(
          "relative z-20 flex w-full rounded-lg bg-background-main-light px-6 py-8 xl:p-9",
          "transition-colors duration-75",
          "dark:bg-background-main-dark",
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-neutral-light-90 hover:shadow-xl dark:hover:bg-neutral-dark-90",
          className
        )}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-20 w-full rounded-lg bg-background-main-light px-6 py-8 dark:bg-background-main-dark xl:p-9",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default Card;
