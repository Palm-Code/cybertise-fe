import { cn } from "@/core/lib/utils";

export const CustomDot = (props: { cx: number; cy: number }) => {
  const { cx, cy } = props; // Coordinates of the dot
  return (
    <g>
      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={12} fill="rgba(170, 255, 0, 0.2)" />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="currentColor"
        stroke="#ffffff"
        strokeWidth={2}
        className={cn("text-lime-normal-light dark:text-lime-normal-dark")}
      />
    </g>
  );
};
