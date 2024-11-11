import { cn } from "@/core/lib/utils";
import Typography, { TypographyProps } from "../typography/typography";
import Link, { LinkProps } from "next/link";
import Indicator from "../indicator/indicator";

type I_TableProps = React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  align?: TypographyProps["align"];
  isClickable?: boolean;
  href?: string;
  hasNotification?: boolean;
};

export const BaseTable = ({
  children,
  className,
  isClickable = false,
  hasNotification = false,
  ...props
}: I_TableProps) => {
  return (
    <div
      className={cn("_flexbox__col__start__start w-full gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableHeader = ({
  children,
  className,
  ...props
}: I_TableProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-neutral-light-80 px-9 py-5 dark:bg-neutral-dark-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableRow = ({
  children,
  className,
  isClickable = false,
  ...props
}: I_TableProps) => {
  return (
    <div
      className={cn("_flexbox__row__between w-full gap-[42px]", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableHead = ({
  children,
  className,
  isClickable = false,
  align = "left",
  ...props
}: I_TableProps) => {
  const textAlign: { [key: string]: string } = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn("w-full", textAlign[align as string], className)}
      {...props}
    >
      <Typography
        variant="p"
        affects="normal"
        weight="semibold"
        align={align}
        className="whitespace-nowrap"
      >
        {children}
      </Typography>
    </div>
  );
};

export const TableBody = ({
  children,
  className,
  isClickable = false,
  ...props
}: I_TableProps) => {
  return (
    <div
      className={cn("_flexbox__col__start__start w-full gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const TableBodyRow = ({
  children,
  className,
  isClickable = false,
  hasNotification = false,
  isButton = false,
  ...props
}: I_TableProps & {
  isButton?: boolean;
}) => {
  if (isClickable) {
    return (
      <Link
        href={props.href as string}
        className={cn(
          "relative w-full rounded-2xl bg-background-main-light px-9 py-5",
          "hover:bg-neutral-light-90 dark:bg-background-main-dark dark:hover:bg-neutral-dark-90",
          className
        )}
      >
        {hasNotification && (
          <Indicator variant="warning" className="absolute -right-4 -top-4" />
        )}
        {children}
      </Link>
    );
  }

  if (isButton)
    return (
      <button
        type="button"
        className={cn(
          "relative w-full rounded-2xl bg-background-main-light",
          "px-9 py-5 dark:bg-background-main-dark",
          "hover:bg-neutral-light-90 dark:hover:bg-neutral-dark-90",
          className
        )}
        {...props}
      >
        {hasNotification && (
          <Indicator variant="warning" className="absolute -right-4 -top-4" />
        )}
        {children}
      </button>
    );

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl bg-background-main-light",
        "px-9 py-5 dark:bg-background-main-dark",
        className
      )}
      {...props}
    >
      {hasNotification && (
        <Indicator variant="warning" className="absolute -right-4 -top-4" />
      )}
      {children}
    </div>
  );
};

export const TableData = ({ children, ...props }: I_TableProps) => {
  return <div {...props}>{children}</div>;
};
