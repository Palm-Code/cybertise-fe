import Link, { type LinkProps } from "next/link";
import { cn } from "@/core/lib/utils";

interface I_CardProps {
  children: React.ReactNode;
  isClickable?: boolean;
  href?: LinkProps["href"];
  className?: string;
  isButton?: boolean;
  onClick?: () => void;
}
const Card = ({
  children,
  isClickable = false,
  className,
  href,
  isButton = false,
  onClick,
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
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button
        className={cn(
          "relative z-20 flex w-full rounded-lg bg-background-main-light p-9",
          "transition-colors duration-75 hover:bg-neutral-light-90 hover:shadow-xl",
          "dark:bg-background-main-dark dark:hover:bg-neutral-dark-90",
          className
        )}
        type="button"
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "relative z-20 w-full rounded-lg bg-background-main-light p-9 dark:bg-background-main-dark",
        className
      )}
    >
      {children}
    </div>
  );
};
export default Card;
