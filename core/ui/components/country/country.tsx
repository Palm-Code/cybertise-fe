import Image from "next/image";
import Typography from "../typography/typography";

const Country = ({
  icon = "",
  label = "",
}: {
  icon?: string;
  label?: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] place-items-center gap-1">
      <Image src={icon as string} alt="country" width={24} height={16} />
      <Typography variant="p" affects="normal">
        {label}
      </Typography>
    </div>
  );
};
export default Country;
