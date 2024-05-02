import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Loader2 } from "lucide-react";
import Typography from "../typography/typography";

interface I_LoaderProps {
  variant?: "hacker" | "company" | "mediator";
  width?: number;
  height?: number;
}

const Loader = ({
  variant = "hacker",
  width = 36,
  height = 36,
}: I_LoaderProps) => {
  return (
    <div className="_flexbox__col__center h-screen w-full gap-4">
      <div className="_flexbox__col__center gap-4">
        <Loader2
          width={width}
          height={height}
          className={cn(
            "m-auto animate-spin transition-all duration-500",
            iconColor[variant]
          )}
        />
        <Typography
          variant="p"
          affects="small"
          align="center"
          className="animate-pulse transition-all duration-1000"
        >
          Getting data...
        </Typography>
      </div>
    </div>
  );
};
export default Loader;
