import Link, { type LinkProps } from "next/link";
import { buttonVariants } from "../button/base-button";
import { cn } from "@/core/lib/utils";

interface I_CardProps {
  children: React.ReactNode;
  isClickable?: boolean;
  href?: LinkProps["href"];
  className?: string;
}
const Card = ({
  children,
  isClickable = false,
  className,
  href,
  ...props
}: I_CardProps) => {
  if (isClickable) {
    return (
      <Link
        className={cn(
          "relative z-20 w-full rounded-lg bg-background-main-light p-9",
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
