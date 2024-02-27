import Link, { type LinkProps } from "next/link";
import { buttonVariants } from "../button/base-button";
import Button from "../button/button";
import { cn } from "@/core/lib/utils";

interface I_CardProps extends LinkProps {
  children: React.ReactNode;
}
const Card = ({ children, ...props }: I_CardProps) => {
  return (
    <Link
      className={cn(
        buttonVariants(),
        "relative z-20 w-full rounded-lg bg-background-main-light p-9 hover:shadow-xl dark:bg-background-main-dark"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
export default Card;
