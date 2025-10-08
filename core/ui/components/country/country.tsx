import Image from "next/image";
import Typography from "../typography/typography";
import { Loader } from "lucide-react";

const Country = ({
  icon = "",
  label = "",
}: {
  icon?: string;
  label?: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] place-items-center gap-1">
      {icon ? (
        <Image
          src={icon || ""}
          alt="country"
          width={24}
          height={16}
          className="h-4 w-6 object-contain"
        />
      ) : (
        <Loader
          className="animate-spin"
          width={24}
          height={24}
        />
      )}
      <Typography
        variant="p"
        affects="normal"
      >
        {label}
      </Typography>
    </div>
  );
};
export default Country;
