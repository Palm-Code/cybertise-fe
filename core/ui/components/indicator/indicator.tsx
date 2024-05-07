import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Indicators } from "../../icons";
import Typography from "../typography/typography";

const indicatorVariants = cva("", {
  variants: {
    variant: {
      hacker: "text-lime-normal-light dark:text-lime-normal-dark rounded-md",
      company: "text-sky-normal rounded-md",
      mediator: "text-violet-normal rounded-md",
      warning: "text-red-normal rounded-full",
      caution: "text-yellow-normal rounded-full",
      pending: "text-yellow-normal rounded-full",
      clear: "text-emerald-normal rounded-full",
      open: "text-red-normal rounded-full",
      closed: "text-emerald-normal rounded-full",
      "waiting for payment": "text-yellow-normal rounded-full",
      paid: "text-emerald-normal rounded-full",
      canceled: "text-red-normal rounded-full",
    },
  },
  defaultVariants: {
    variant: "hacker",
  },
});

export interface IndicatorProps
  extends React.HTMLAttributes<SVGElement>,
    VariantProps<typeof indicatorVariants> {}

const Indicator = ({
  children,
  className,
  variant,
  ...props
}: IndicatorProps) => {
  if (children) {
    return (
      <Typography
        variant="p"
        affects="small"
        className="-ml-2.5 grid grid-cols-[auto_1fr] items-center"
      >
        <Indicators className={indicatorVariants({ variant, className })} />
        {children}
      </Typography>
    );
  }
  return (
    <Indicators
      className={indicatorVariants({ variant, className })}
      {...props}
    />
  );
};
export default Indicator;
