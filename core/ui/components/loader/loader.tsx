import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Loader2 } from "lucide-react";
import Typography from "../typography/typography";
import { Role } from "@/types/admin/sidebar";

interface I_LoaderProps {
  variant?: keyof typeof Role;
  width?: number;
  height?: number;
  className?: string;
  noText?: boolean;
}

const Loader = ({
  variant = "hacker",
  width = 36,
  height = 36,
  className = "",
  noText = false,
}: I_LoaderProps) => {
  return (
    <div
      className={cn("_flexbox__col__center h-screen w-full gap-4", className)}
    >
      <div className="_flexbox__col__center gap-4">
        <Loader2
          width={width}
          height={height}
          className={cn(
            "m-auto animate-spin transition-all duration-500",
            iconColor[variant]
          )}
        />
        {!noText && (
          <Typography
            variant="p"
            affects="small"
            align="center"
            className="animate-pulse transition-all duration-1000"
          >
            Getting data...
          </Typography>
        )}
      </div>
    </div>
  );
};
export default Loader;
