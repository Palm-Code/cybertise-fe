import { cn } from "@/core/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const typographyVariants = cva(
  "text-xl text-neutral-90 dark:text-white transition-colors duration-100",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 leading-120 text-4xl tracking-tight lg:text-6xl",
        h2: "scroll-m-20 leading-120 border-b pb-2 text-[36px] lg:text-5xl tracking-tight first:mt-0",
        h3: "scroll-m-20 leading-120 text-3xl lg:text-4xl tracking-tight",
        h4: "scroll-m-20 leading-140 lg:leading-120 text-2xl lg:text-3xl tracking-tight",
        h5: "scroll-m-20 leading-140 lg:leading-120 text-xl lg:text-2xl tracking-tight",
        h6: "scroll-m-20 leading-140 lg:leading-120 text-lg lg:text-xl tracking-tight",
        p: "leading-150",
      },
      affects: {
        default: "",
        large: "text-xl",
        normal: "text-base",
        small: "text-sm",
        tiny: "text-xs",
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      align: {
        left: "text-start",
        center: "text-center",
        right: "text-end",
      },
    },
    defaultVariants: {
      variant: "h1",
      affects: "default",
      weight: "normal",
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, affects, weight, ...props }, ref) => {
    const Comp = variant || "p";
    return (
      <Comp
        className={cn(
          typographyVariants({ variant, affects, weight, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "H1";

export default Typography;
