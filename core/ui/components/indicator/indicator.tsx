import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Indicators } from "../../icons";
import Typography from "../typography/typography";

const indicatorVariants = cva("", {
  variants: {
    variant: {
      hacker: "text-lime-normal rounded-md",
      company: "text-sky-normal rounded-md",
      mediator: "text-violet-normal rounded-md",
      warning: "text-red-normal rounded-full",
      caution: "text-yellow-normal rounded-full",
      clear: "text-emerald-normal rounded-full",
    },
  },
  defaultVariants: {
    variant: "hacker",
  },
});

interface IndicatorProps
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
        className="_flexbox__row__center gap-3"
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
